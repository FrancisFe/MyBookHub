using MyBookHub.Business.DTOs.Author;
using MyBookHub.Business.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace MyBookHub.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorService _authorService;

        public AuthorController(IAuthorService authorService)
        {
            _authorService = authorService;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<AuthorDto>>> GetAll()
        {
            var authors = await _authorService.GetAllAsync();
            return Ok(authors);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AuthorDto>> GetById(int id)
        {
            var author = await _authorService.GetByIdAsync(id);
            return Ok(author);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<AuthorDto>> Create([FromBody] CreateAuthorDto createAuthor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var author = await _authorService.CreateAsync(createAuthor);
            return CreatedAtAction(nameof(GetById), new { id = author.Id }, author);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<AuthorDto>> Update(int id, [FromBody] UpdateAuthorDto updateAuthor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var author = await _authorService.UpdateAsync(id, updateAuthor);
            return Ok(author);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Delete(int id)
        {
            await _authorService.DeleteAsync(id);
            return NoContent();
        }
    }
}
