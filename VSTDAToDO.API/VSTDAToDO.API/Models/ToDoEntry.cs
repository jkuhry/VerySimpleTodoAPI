using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToDO.API.Models
{
    public class ToDoEntry
    {
        public int ToDoEntryId { get; set; }

        public string Text { get; set; }
        public string Priority { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
