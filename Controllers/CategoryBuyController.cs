using System.Collections.Generic;
using System.Threading.Tasks;

using Mapster;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Shine.Controllers.Interfaces;
using Shine.Data;
using Shine.Data.Dto._Paging;
using Shine.Data.Dto.Categories.Buy;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;

namespace Shine.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoryBuyController : ControllerBase, ICategoryBuyController {
#region Private Field
        private readonly ICategoryBuyRepository _repository;
        private readonly AppDbContext _context;

#endregion

#region Constructor
        public CategoryBuyController(ICategoryBuyRepository repository, AppDbContext context) {

            this._repository = repository;
            this._context = context;
        }
#endregion

#region Get Values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryBuyDto>>> GetCategories() {
            var query = await _repository.GetCategoriesAsync(c => c.CategoryName, "asc");
            return Ok(query);
        }

        [HttpGet("paged")]

        public async Task<ActionResult<Paged<CategoryBuyDto>>> GetPagedCategories(
            [FromQuery] PagingParams pagingParams, [FromQuery] SortParams sortParams, string filter) {

            var query = await _repository.GetPagedCategoriesAsync(pagingParams, sortParams, filter);

            return new Paged<CategoryBuyDto>(query);

        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CategoryBuyDto>> GetCategory(int id) {
            var category = await _repository.GetCategoryAsync(id);
            if (category == null) {
                return NotFound();
            }
            return Ok(category);
        }
#endregion

#region Actions
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CategoryBuyDto>> AddCategory([FromBody] CategoryBuy categoryBuy) {
            await _repository.AddCategoryAsync(categoryBuy);
            await _repository.CommitAsync();

            return CreatedAtAction(nameof(GetCategory),
                new { id = categoryBuy.CategoryId },
                categoryBuy.Adapt<CategoryBuyDto>());

        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CategoryBuyDto>> UpdateCategory([FromBody] CategoryBuy categoryBuy) {
            var category = await _repository.UpdateCategoryAsync(categoryBuy);

            if (category == null) return NotFound();

            await _repository.CommitAsync();

            return category;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<CategoryBuyDto>> DeleteCategory(int id) {
            var category = await _repository.DeleteCategoryAsync(id);

            if (category == null) return NotFound();

            await _repository.CommitAsync();

            return category;
        }

        [HttpDelete("delete-all")]
        public async Task<bool> DeleteCategories([FromHeader] string[] ids) {
            var query = await _repository.DeleteCategoriesAsync(ids);

            if (query) {
                await _repository.CommitAsync();
            }

            return query;
        }

#endregion

    }
}
