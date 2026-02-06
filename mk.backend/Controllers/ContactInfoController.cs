using Microsoft.AspNetCore.Mvc;
using mk.backend.BaseController;
using mk.backend.DTOs.Request;
using mk.backend.DTOs.Response;
using mk.backend.Models;
using mk.backend.Services;

namespace mk.backend.Controllers
{
  public class ContactInfoController(IContactInfoService service)
      : BaseApiController<ContactInfo, ContactInfoRequestDTO, IContactInfoService>(service)
  {
    [HttpPost]
    public override async Task<ActionResult<ApiResponse<ContactInfo>>> Create(ContactInfoRequestDTO dto)
    {
      ProcessContactUrl(dto);
      var result = await _service.AddAsync(dto);
      return StatusCode(201, ApiResponse<ContactInfo>.SuccessResponse(result, "Created successfully", 201));
    }

    [HttpPut("{id}")]
    public override async Task<ActionResult<ApiResponse<object>>> Update(string id, ContactInfoRequestDTO dto)
    {
      var existing = await _service.GetByIdAsync(id);
      if (existing == null)
        return NotFound(ApiResponse<object>.FailureResponse("Contact info not found", ["Contact info not found"], 404));

      ProcessContactUrl(dto);

      await _service.UpdateAsync(id, dto);
      return Ok(ApiResponse<object>.SuccessResponse(null, "Updated successfully"));
    }

    private static void ProcessContactUrl(ContactInfoRequestDTO contact)
    {
      if (string.IsNullOrWhiteSpace(contact.Url)) return;

      string input = contact.Url.Trim();

      // Check if it's already a mailto link
      if (input.StartsWith("mailto:", StringComparison.OrdinalIgnoreCase)) return;

      // Validate if it's a plain email address
      var emailChecker = new System.ComponentModel.DataAnnotations.EmailAddressAttribute();
      if (emailChecker.IsValid(input))
      {
        contact.Url = $"mailto:{input.ToLower()}";
      }
    }
  }
}