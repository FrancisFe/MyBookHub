using AutoMapper;
using MyBookHub.Business.DTOs.Category;
using MyBookHub.Business.Services.Interfaces;
using MyBookHub.Data.Entities;
using MyBookHub.Data.Repositories.Interfaces;

namespace MyBookHub.Business.Services.Implementations;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;
    private readonly IMapper _mapper;

    public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
    {
        _categoryRepository = categoryRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<CategoryDto>> GetAllAsync()
    {
        var categories = await _categoryRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<CategoryDto>>(categories);
    }

    public async Task<CategoryDto> GetByIdAsync(int id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category == null)
        {
            throw new KeyNotFoundException($"Categoría con Id {id} no encontrada");
        }
        return _mapper.Map<CategoryDto>(category);
    }

    public async Task<CategoryDto> CreateAsync(CreateCategoryDto createCategoryDto)
    {
        if (createCategoryDto == null)
        {
            throw new ArgumentNullException(nameof(createCategoryDto));
        }

        var categoryEntity = _mapper.Map<Category>(createCategoryDto);
        await _categoryRepository.AddAsync(categoryEntity);
        var categoryDto = _mapper.Map<CategoryDto>(categoryEntity);
        return categoryDto;
    }

    public async Task<CategoryDto> UpdateAsync(int id, UpdateCategoryDto updateCategoryDto)
    {
        if (updateCategoryDto == null)
        {
            throw new ArgumentNullException(nameof(updateCategoryDto));
        }

        var categoryEntity = _mapper.Map<Category>(updateCategoryDto);
        var categoryExisting = await _categoryRepository.UpdateAsync(id, categoryEntity);
        if (categoryExisting == null)
        {
            throw new KeyNotFoundException($"Categoría con Id {id} no encontrada");
        }
        var categoryDto = _mapper.Map<CategoryDto>(categoryExisting);
        return categoryDto;
    }

    public async Task<bool> DeleteAsync(int id)
    {

        var hasAssociatedBooks = await _categoryRepository.HasAssociatedBooksAsync(id);
        if (hasAssociatedBooks)
        {
            throw new InvalidOperationException(
                $"No se puede eliminar la categoría con Id {id} porque tiene libros asociados.");
        }

        await _categoryRepository.DeleteAsync(id);
        return true;
    }
}
