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

        public RecPhotosController()
        {
            _repo = new RecPhotosRepository();
        }

        [HttpGet("{recId}")]
        public IActionResult GetPhotosByRecId(int recId)
        {
            var recPhotos = _repo.GetRecPhotos(recId);
            return Ok(recPhotos);
        }
    }
}
