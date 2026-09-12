import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { TodoService } from "../services/todo.service.js";

import type { ITodoRepository } from "../repositories/todo.repository.interface.js";

describe("TodoService", () => {
  let service: TodoService;

  let mockRepository: jest.Mocked<ITodoRepository>;

  const fakeTodo = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    title: "Learn Unit Testing",
    description: "Learn Jest",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    service = new TodoService(mockRepository);
  });

  describe("createTodo", () => {
    it("should create a todo", async () => {
      const payload = {
        title: "Learn Unit Testing",
        description: "Learn Jest",
      };

      mockRepository.create.mockResolvedValue(fakeTodo);

      const result = await service.createTodo(payload);

      expect(mockRepository.create).toHaveBeenCalledWith(payload);

      expect(mockRepository.create).toHaveBeenCalledTimes(1);

      expect(result).toEqual(fakeTodo);
    });
  });

  describe("getTodoById", () => {
    it("should return todo by id", async () => {
      mockRepository.findById.mockResolvedValue(fakeTodo);

      const result = await service.getTodoById(fakeTodo.id);

      expect(mockRepository.findById).toHaveBeenCalledWith(
        fakeTodo.id
      );

      expect(mockRepository.findById).toHaveBeenCalledTimes(1);

      expect(result).toEqual(fakeTodo);
    });

    it("should throw error when todo does not exist", async () => {
      const id = "550e8400-e29b-41d4-a716-446655440001";

      mockRepository.findById.mockResolvedValue(undefined);

      await expect(
        service.getTodoById(id)
      ).rejects.toThrow("Todo not found!");

      expect(mockRepository.findById).toHaveBeenCalledWith(id);
    });
  });

  describe("updateTodo", () => {
    it("should update a todo", async () => {
      const payload = {
        title: "Updated Todo",
      };

      const updatedTodo = {
        ...fakeTodo,
        title: "Updated Todo",
      };

      mockRepository.findById.mockResolvedValue(fakeTodo);

      mockRepository.update.mockResolvedValue(updatedTodo);

      const result = await service.updateTodo(
        fakeTodo.id,
        payload
      );

      expect(mockRepository.findById).toHaveBeenCalledWith(
        fakeTodo.id
      );

      expect(mockRepository.update).toHaveBeenCalledWith(
        fakeTodo.id,
        payload
      );

      expect(mockRepository.update).toHaveBeenCalledTimes(1);

      expect(result).toEqual(updatedTodo);
    });

    it("should throw error when updating non-existing todo", async () => {
      const id = "550e8400-e29b-41d4-a716-446655440001";

      const payload = {
        title: "Updated Todo",
      };

      mockRepository.findById.mockResolvedValue(undefined);

      await expect(
        service.updateTodo(id, payload)
      ).rejects.toThrow("Todo not found");

      expect(mockRepository.findById).toHaveBeenCalledWith(id);

      expect(mockRepository.update).not.toHaveBeenCalled();
    });
  });

  describe("deleteTodo", () => {
    it("should delete a todo", async () => {
      mockRepository.findById.mockResolvedValue(fakeTodo);

      mockRepository.delete.mockResolvedValue(undefined);

      const result = await service.deleteTodo(fakeTodo.id);

      expect(mockRepository.findById).toHaveBeenCalledWith(
        fakeTodo.id
      );

      expect(mockRepository.delete).toHaveBeenCalledWith(
        fakeTodo.id
      );

      expect(mockRepository.delete).toHaveBeenCalledTimes(1);

      expect(result).toEqual(fakeTodo);
    });

    it("should throw error when deleting non-existing todo", async () => {
      const id = "550e8400-e29b-41d4-a716-446655440001";

      mockRepository.findById.mockResolvedValue(undefined);

      await expect(
        service.deleteTodo(id)
      ).rejects.toThrow("Todo not found");

      expect(mockRepository.findById).toHaveBeenCalledWith(id);

      expect(mockRepository.delete).not.toHaveBeenCalled();
    });
  });
});