import request from "supertest";
import  app  from "../../../app.js"
import { describe, expect, it } from "@jest/globals";



describe("Todo API Integration Test", () => {
  it("should create a todo", async () => {
    const response = await request(app)
      .post("/api/v1/todos")
      .send({
        title: "Integration Test Todo",
        description: "Testing with real database",
      });

    expect(response.status).toBe(201);

    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.title).toBe("Integration Test Todo");
    expect(response.body.data.description).toBe("Testing with real database");
  });

  it("should get a todo by id", async()=>{
    const createResponse = await request(app)
      .post("/api/v1/todos")
      .send({
        title: "this is todo test",
        description: "test the get by id todo"
      })
  
      const todoId = createResponse.body.data.id
      const response = await request(app)
        .get(`/api/v1/todos/${todoId}`)
  
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(todoId)
        expect(response.body.data.title).toBe("this is todo test")
        expect(response.body.data.description).toBe("test the get by id todo")
  })
  
  it("should update a todo", async ()=>{
    const createResponse = await request(app)
      .post("/api/v1/todos")
      .send({
        title: "todo before update"
      })
      const todoId = createResponse.body.data.id
  
      const response = await request(app)
        .patch(`/api/v1/todos/${todoId}`)
        .send({
          title: "todo after update",
          completed: true
        })
  
        expect(response.status).toBe(200)
        expect(response.body.data.title).toBe("todo after update")
        expect(response.body.data.completed).toBe(true)
  })

  it("should delete a todo", async()=>{
    const createResponse = await request(app)
      .post("/api/v1/todos")
      .send({
        title: "delete todo",
        description:"this todo will be deleted"
      })

      const todoId = createResponse.body.data.id

      const deleteResponse = await request(app)
        .delete(`/api/v1/todos/${todoId}`)

      expect(deleteResponse.status).toBe(200)
      // expect(deleteResponse.body.data.id).toBe(todoId)
      // expect(deleteResponse.body.data.title).toBe("delete todo")

      const getResponse = await request(app)
        .get(`/api/v1/todos/${todoId}`)

      expect(getResponse.status).toBe(404)
  })

  it("should get all todos", async ()=>{
    await request(app)
      .post("/api/v1/todos")
      .send({
        title: "todo one",
        description: "first todo"
      })

    await request(app)
      .post("/api/v1/todos")
      .send({
          title:"todo two",
          description: "second todo"
      })

    const response = await request(app)
      .get("/api/v1/todos")
      .query({
          page: 1,
          limit: 10
      })

      // console.log("GET ALL STATUS:", response.status);
      // console.log("GET ALL BODY:", response.body);
      
      
      expect(response.status).toBe(200)
    //expect(response.body.data).toBeInstanceOf(Array)
    // expect(response.body).toHaveProperty("pagination")
    // expect(response.body.pagination.page).toBe(1)
    // expect(response.body.pagination.limit).toBe(10)
  })

  it("should paginate todos", async () => {
  await request(app)
    .post("/api/v1/todos")
    .send({ title: "Pagination Todo 1" });

  await request(app)
    .post("/api/v1/todos")
    .send({ title: "Pagination Todo 2" });

  await request(app)
    .post("/api/v1/todos")
    .send({ title: "Pagination Todo 3" });

  const response = await request(app)
    .get("/api/v1/todos")
    .query({
      page: 1,
      limit: 2,
    });

  expect(response.status).toBe(200);

 
  });

  
it("should filter todos by completion status", async () => {
  await request(app)
    .post("/api/v1/todos")
    .send({
      title: "Completed Todo",
    });

  await request(app)
    .post("/api/v1/todos")
    .send({
      title: "Pending Todo",
    });

  const updateResponse = await request(app)
    .get("/api/v1/todos")
    .query({
      page: 1,
      limit: 10,
      completed: true,
    });

  expect(updateResponse.status).toBe(200);

  console.log(
    "FILTER RESPONSE:",
    JSON.stringify(updateResponse.body, null, 2)
    );
  });


  it("should sort todos by title", async () => {
  await request(app)
    .post("/api/v1/todos")
    .send({
      title: "Zebra Todo",
    });

  await request(app)
    .post("/api/v1/todos")
    .send({
      title: "Apple Todo",
    });

  const response = await request(app)
    .get("/api/v1/todos")
    .query({
      page: 1,
      limit: 10,
      sortBy: "title",
      sortOrder: "asc",
    });

  expect(response.status).toBe(200);

  console.log(
    "SORT RESPONSE:",
    JSON.stringify(response.body, null, 2)
  );
});

  it("should return 404 when todo does not exist", async () => {
  const nonExistingId = "550e8400-e29b-41d4-a716-446655440000";

  const response = await request(app)
    .get(`/api/v1/todos/${nonExistingId}`);

  expect(response.status).toBe(404);

  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("Todo not found!");
  });


  it("should return 400 for invalid todo id", async () => {
  const response = await request(app)
    .get("/api/v1/todos/invalid-id");

  expect(response.status).toBe(400);
  expect(response.body.success).toBe(false);
});

it("should return 400 when creating todo without title ", async()=>{
  const response = await request(app)
    .post("/api/v1/todos")
    .send({
      description: "todo without title"
    })
    expect(response.status).toBe(400)
    expect(response.body.success).toBe(false)
})
it("should return 400 when creating todo with invalid title", async () => {
  const response = await request(app)
    .post("/api/v1/todos")
    .send({
      title: "",
      description: "invalid title",
    });

  expect(response.status).toBe(400);
  expect(response.body.success).toBe(false);
});

it("should return 400 when updating todo with invalid body", async () => {
  const createResponse = await request(app)
    .post("/api/v1/todos")
    .send({
      title: "Todo for invalid update",
    });

  const todoId = createResponse.body.data.id;

  const response = await request(app)
    .patch(`/api/v1/todos/${todoId}`)
    .send({
      title: "",
    });

  expect(response.status).toBe(400);
  expect(response.body.success).toBe(false);
});


it("should return 400 for invalid page query", async () => {
  const response = await request(app)
    .get("/api/v1/todos")
    .query({
      page: 0
    });

  expect(response.status).toBe(400);
  expect(response.body.success).toBe(false);
});

it("should return 400 for invalid limit query", async () => {
  const response = await request(app)
    .get("/api/v1/todos")
    .query({
      limit: 101
    });

  expect(response.status).toBe(400);
  expect(response.body.success).toBe(false);
});

it("should return 400 for invalid sort order", async () => {
  const response = await request(app)
    .get("/api/v1/todos")
    .query({
      sortOrder: "wrong"
    });

  expect(response.status).toBe(400);
  expect(response.body.success).toBe(false);
});

it("should return 400 for invalid sort field", async () => {
  const response = await request(app)
    .get("/api/v1/todos")
    .query({
      sortBy: "invalidField"
    });

  expect(response.status).toBe(400);
  expect(response.body.success).toBe(false);
})
});
