using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Trekommend.Data;
using Trekommend.Models;

namespace Trekommend.Controllers
{
    [Route("api/rec-photos")]
    [ApiController]
    public class RecPhotosController : ControllerBase
    {
        RecPhotosRepository _repo;

        public RecPhotosController(RecPhotosRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("{recId}")]
        public IActionResult GetPhotosByRecId(int recId)
        {
            var recPhotos = _repo.GetRecPhotos(recId);
            return Ok(recPhotos);
        }

        [HttpPost]
        public IActionResult AddRecPhoto(RecommendationPhoto newPhoto)
        {
            _repo.AddPhoto(newPhoto);

            return Created($"api/rec-photos/{newPhoto.PhotoId}", newPhoto);
        }
    }
}
