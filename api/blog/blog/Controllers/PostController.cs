using blog.Data;
using blog.Models.DTO;
using blog.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace blog.Controllers
{


        [ApiController]
        [Route("/api/[controller]")]
        public class PostsController : Controller
        {
            private readonly TheDevBlogDbContext dbContext;
            public PostsController(TheDevBlogDbContext dbContext)
            {
                this.dbContext = dbContext;
            }
            [HttpGet]
            public async Task<IActionResult>  GetAllPosts()
            {
                var posts = await dbContext.Posts.ToListAsync();
                return Ok(posts);
            }
            [HttpGet]
            [Route("{id:guid}")]
            [ActionName("GetPostById")]
            public async Task<IActionResult> GetPostById(Guid id )
            {
                var post = await dbContext.Posts.FirstOrDefaultAsync(x => x.Id == id);
                if(post != null)
                {
                    return Ok(post);
                }
                return NotFound();
            }

            [HttpPost]
            public async Task<IActionResult> AddPost(AddPostRequest post)
            {

                // Convert DTO /data transfer object/ to entity
                var newPost = new Post()
                {
                    Title = post.Title,
                    Content = post.Content,
                    Author = post.Author,
                    FeaturedImageUrl = post.FeaturedImageUrl,
                    PublishedDate = post.PublishedDate,
                    UpdatedDate = post.UpdatedDate,
                    Summary = post.Summary,
                    UrlHandle = post.UrlHandle,
                    Visible = post.Visible

                };
                newPost.Id = Guid.NewGuid();
                await dbContext.Posts.AddAsync(newPost);
                await dbContext.SaveChangesAsync();

                return CreatedAtAction(nameof(GetPostById), new { id = newPost.Id }, newPost);
            }

            [HttpPut]
            [Route("{id:guid}")]
            public async Task<IActionResult> UpdatePost([FromRoute] Guid id,UpdatePostRequest updatedPost  )
            {

       
                // check if exist
                var existingPost = await dbContext.Posts.FindAsync(id);

                if(existingPost != null)
                {
                    existingPost.Title = updatedPost.Title;
                    existingPost.Content = updatedPost.Content;
                    existingPost.Author = updatedPost.Author;
                    existingPost.FeaturedImageUrl = updatedPost.FeaturedImageUrl;
                    existingPost.PublishedDate = updatedPost.PublishedDate;
                    existingPost.UpdatedDate = updatedPost.UpdatedDate;
                    existingPost.Summary = updatedPost.Summary;
                    existingPost.UrlHandle = updatedPost.UrlHandle;
                    existingPost.Visible = updatedPost.Visible;
                   await dbContext.SaveChangesAsync();

                    return Ok(existingPost);
                }

                return NotFound();
            }

            [HttpDelete]
            [Route("{id:guid}")]
            public async Task<IActionResult> DeletePost([FromRoute] Guid id)
            {
                var existingPost = await dbContext.Posts.FindAsync(id);
                if(existingPost != null)
                {
                    dbContext.Remove(existingPost);
                    await dbContext.SaveChangesAsync();
                    return Ok();
                }
                return NotFound();
            }

        }
}
