using blog.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace blog.Data
{
    public class TheDevBlogDbContext: DbContext
    {
        public TheDevBlogDbContext(DbContextOptions options ): base(options)
        {

        }

        // DBSet

        public DbSet<Post> Posts { get; set; }
    }
}
