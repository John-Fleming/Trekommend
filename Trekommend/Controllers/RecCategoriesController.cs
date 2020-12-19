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
    [Route("api/rec-categories")]
    [ApiController]
    public class RecCategoriesController : ControllerBase
    {
        RecCategoriesRepository _repo;

        public RecCategoriesController(RecCategoriesRepository repo)
        {
            _repo = repo;
        }

        [HttpGet()]
        public IActionResult GetAllRecCategories()
        {
            var categories = _repo.GetAllCategories();
            return Ok(categories);
        }

        [HttpGet("{categoryId}")]
        public IActionResult GetSingleRecCategory(int categoryId)
        {
            var singleCategory = _repo.GetSingleRecCategory(categoryId);
            return Ok(singleCategory);
        }
    }
}
