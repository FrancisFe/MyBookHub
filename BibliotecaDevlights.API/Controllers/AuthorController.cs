using BibliotecaDevlights.Business.DTOs.Author;
using BibliotecaDevlights.Business.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaDevlights.API.Controllers
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
            
        /// <summary>
        /// Obtiene todos los autores
        /// </summary>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<AuthorDto>>> GetAll()
        {
            var authors = await _authorService.GetAllAsync();
            return Ok(authors);
        }

        /// <summary>
        /// Obtiene un autor por ID
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<AuthorDto>> GetById(int id)
        {
            try
            {
                var author = await _authorService.GetByIdAsync(id);
                return Ok(author);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Autor no encontrado" });
            }
        }

        /// <summary>
        /// Crea un nuevo autor
        /// </summary>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AuthorDto>> Create([FromBody] CreateAuthorDto createAuthor)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var author = await _authorService.CreateAsync(createAuthor);
                return CreatedAtAction(nameof(GetById), new { id = author.Id }, author);
            }
            catch (ArgumentNullException)
            {
                return BadRequest(new { message = "Los datos del autor no pueden estar vacíos" });
            }
        }

        /// <summary>
        /// Actualiza un autor existente
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AuthorDto>> Update(int id, [FromBody] UpdateAuthorDto updateAuthor)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var author = await _authorService.UpdateAsync(id, updateAuthor);
                return Ok(author);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Autor no encontrado" });
            }
            catch (ArgumentNullException)
            {
                return BadRequest(new { message = "Los datos del autor no pueden estar vacíos" });
            }
        }

        /// <summary>
        /// Elimina un autor
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                await _authorService.DeleteAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Autor no encontrado" });
            }
        }
    }
}
