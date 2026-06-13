"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamSourceService = void 0;
const repositories_1 = require("../../db/repositories");
exports.streamSourceService = {
    async getAllStreamSources() {
        return await repositories_1.streamSourceRepo.find({
            relations: ["commentator"],
        });
    },
    async getStreamSource(id) {
        return await repositories_1.streamSourceRepo.findOne({
            where: { id },
            relations: ["commentator"],
        });
    },
    async createStreamSource(payload) {
        const commentator = await repositories_1.internalUserRepo.findOneBy({
            id: payload.commentatorId ?? -9999,
        });
        if (!commentator)
            throw new Error("Invalid commentatorId");
        const newSource = repositories_1.streamSourceRepo.create({
            commentator,
            priority: payload.priority ?? 0,
            name: payload.name,
            sourceUrl: payload.sourceUrl,
        });
        return await repositories_1.streamSourceRepo.save(newSource);
    },
    async updateStreamSource(id, payload) {
        let source = await repositories_1.streamSourceRepo.findOne({
            where: { id },
            relations: ["commentator"],
        });
        if (!source)
            return null;
        const { commentatorId, ...data } = payload;
        if (commentatorId) {
            const commentator = await repositories_1.internalUserRepo.findOneBy({
                id: commentatorId ?? -9999,
            });
            if (!commentator)
                throw new Error("Invalid commentatorId");
            source.commentator = commentator;
        }
        repositories_1.streamSourceRepo.merge(source, data);
        return await repositories_1.streamSourceRepo.save(source);
    },
    async deleteStreamSource(id) {
        return await repositories_1.streamSourceRepo.delete(id);
    },
};
