using System;
using System.Collections.Generic;
using System.Linq;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shine.Data;
using Shine.Data.Dto.Products;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;

namespace Shine.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [Authorize]
    public class ProductBuyController
    {
        private readonly ProductBuyRepository _repository;
        public ProductBuyController(ProductBuyRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public IEnumerable<ProductBuyListDto> GetProducts()
        {
            return _repository.GetProductListDto();
        }

        [HttpGet("{id}")]
        public ProductBuyDto GetProduct(int id)
        {
            return _repository.GetProductDto(id);
        }

        [HttpPost]
        public void AddProduct([FromBody] ProductBuy productBuy)
        {
            _repository.Add(productBuy);
            _repository.Commit();
        }

        [HttpPut]
        public void UpdateProduct([FromBody]ProductBuy productBuy)
        {
            _repository.UpdateProduct(productBuy);
            _repository.Commit();
        }

        [HttpDelete("{id}")]
        public void DeleteProduct(int id)
        {
            _repository.DeleteProduct(id);
            _repository.Commit();
        }

    }
}
