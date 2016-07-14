using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using ToDO.API.Data;
using ToDO.API.Models;

namespace VSTDAToDO.API.Controllers
{
    [EnableCors(origins: "http://127.0.0.1:8080", headers: "*", methods: "*")]

    public class ToDoEntriesController : ApiController
    {
        private ToDoDataContext db = new ToDoDataContext();

        // GET: api/ToDoEntries
        public IQueryable<ToDoEntry> GetToDoEntries()
        {
            return db.ToDoEntries;
        }

        // GET: api/ToDoEntries/5
        [ResponseType(typeof(ToDoEntry))]
        public IHttpActionResult GetToDoEntry(int id)
        {
            ToDoEntry toDoEntry = db.ToDoEntries.Find(id);
            if (toDoEntry == null)
            {
                return NotFound();
            }

            return Ok(toDoEntry);
        }

        // PUT: api/ToDoEntries/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutToDoEntry(int id, ToDoEntry toDoEntry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != toDoEntry.ToDoEntryId)
            {
                return BadRequest();
            }

            db.Entry(toDoEntry).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToDoEntryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ToDoEntries
        [ResponseType(typeof(ToDoEntry))]
        public IHttpActionResult PostToDoEntry(ToDoEntry toDoEntry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ToDoEntries.Add(toDoEntry);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = toDoEntry.ToDoEntryId }, toDoEntry);
        }

       



// DELETE: api/ToDoEntries/5
[ResponseType(typeof(ToDoEntry))]
        public IHttpActionResult DeleteToDoEntry(int id)
        {
            ToDoEntry toDoEntry = db.ToDoEntries.Find(id);
            if (toDoEntry == null)
            {
                return NotFound();
            }

            db.ToDoEntries.Remove(toDoEntry);
            db.SaveChanges();

            return Ok(toDoEntry);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ToDoEntryExists(int id)
        {
            return db.ToDoEntries.Count(e => e.ToDoEntryId == id) > 0;
        }
    }
}