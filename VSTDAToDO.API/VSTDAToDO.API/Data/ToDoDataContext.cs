
using System.Data.Entity;
using ToDO.API.Models;

namespace ToDO.API.Data
{
    public class ToDoDataContext : DbContext

    {
        public ToDoDataContext() : base("ToDo")
        {

        }

        public IDbSet<ToDoEntry> ToDoEntries { get; set; }
    }
}