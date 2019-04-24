using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

using CloudinaryDotNet;

using Mapster;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

using Shine.Controllers.Interfaces;
using Shine.Data.Dto.Photos;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Models;
using Shine.Helpers;

namespace Shine.Controllers {
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PhotoController : ControllerBase, IPhotoController {

#region Private Fields

        private readonly IPhotoRepository _repository;

#endregion

#region Constructor

        public PhotoController(IPhotoRepository repository) {
            this._repository = repository;
        }

#endregion

#region Get Values

        [HttpGet("{personId}")]
        public async Task<ActionResult<IEnumerable<PhotoForPersonDto>>> GetPhotos(int personId) {
            var photos = await _repository.GetPhotosAsync(personId);

            if (photos == null) return NotFound();

            return Ok(photos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PhotoForPersonDto>> GetPhoto(int id) {
            var photo = await _repository.GetPhotoAsync(id);

            if (photo == null) {
                return NotFound();
            }

            return photo;
        }

#endregion

#region Actions

        // Not use
        [HttpPost("{personId}/not-use")]

        public async Task<ActionResult<IEnumerable<PhotoForPersonDto>>> AddPhotosForPerson(int personId, [FromForm] IEnumerable<IFormFile> files) {
            var photos = await _repository.AddPhotosAsync(personId, files);

            if (photos != null)
                await _repository.CommitAsync();

            return Ok(photos);
        }

        [HttpPost("{personId}")]
        public async Task<ActionResult<PhotoForPersonDto>> AddPhotoForPerson(int personId, [FromForm] IFormFile file) {
            var photo = await _repository.AddPhotoAsync(personId, file);

            if (photo != null)
                await _repository.CommitAsync();

            return CreatedAtAction(nameof(GetPhoto), new { id = photo.PhotoId }, photo.Adapt<PhotoForPersonDto>());

        }

        [HttpPut]
        public async Task<ActionResult<PhotoForPersonDto>> SetMainPhoto(PhotoForPersonDto photo) {
            var photoToSet = await _repository.SetMainPhotoAsync(photo);

            if (photoToSet == null) return NotFound();

            await _repository.CommitAsync();

            return photoToSet;
        }

        [HttpDelete("{photoId}")]
        public async Task<ActionResult<PhotoForPersonDto>> DeletePhoto(int photoId) {
            var photo = await _repository.DeletePhotoAsync(photoId);

            if (photo == null) return NotFound();

            await _repository.CommitAsync();

            return photo;
        }

#endregion

    }
}
