import {
  fixtureCommentatorRepo,
  fixtureRepo,
  internalUserRepo,
} from "../../db/repositories";

export const fixtureCommentatorService = {
  // Lấy tất cả
  async getAllFixtureCommentators() {
    return await fixtureCommentatorRepo.find({
      relations: ["commentator", "fixture"],
      order: { priority: "ASC" },
    });
  },

  // Lấy commentators theo fixtureId
  async getFixtureCommentators(fixtureId: number) {
    return await fixtureCommentatorRepo.find({
      where: { fixture: { id: fixtureId } },
      relations: ["commentator", "fixture"],
      order: { priority: "ASC" },
    });
  },

  // Add commentator
  async addFixtureCommentator(
    fixtureId: number,
    commentatorId: number,
    priority: number = 0
  ) {
    const fixture = await fixtureRepo.findOneBy({ id: fixtureId });
    if (!fixture) throw new Error("Fixture not found");

    const commentator = await internalUserRepo.findOneBy({ id: commentatorId });
    if (!commentator) throw new Error("Invalid commentatorId");

    const fc = fixtureCommentatorRepo.create({
      fixture,
      commentator,
      priority,
    });
    return await fixtureCommentatorRepo.save(fc);
  },

  // Update
  async updateFixtureCommentator(id: number, data: any) {
    let fc = await fixtureCommentatorRepo.findOne({
      where: { id },
      relations: ["commentator", "fixture"],
    });
    if (!fc) return null;

    fixtureCommentatorRepo.merge(fc, data);
    return await fixtureCommentatorRepo.save(fc);
  },

  // Delete
  async deleteFixtureCommentator(id: number) {
    return await fixtureCommentatorRepo.delete(id);
  },
};
