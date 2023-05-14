import api from "../../../services/api";
import { CreateKeywordInterface } from "../interfaces/create-keyword.interface";
import { UpdateKeywordInterface } from "../interfaces/update-keyword.interface";

const keywordService = {
  getAll: () => api.get("keywords"),
  getOne: (id: number) => api.get(`keywords/${id}`),
  create: (data: CreateKeywordInterface) => api.post("keywords", data),
  update: (id: number, data: UpdateKeywordInterface) =>
    api.put(`keywords/${id}`, data),
  delete: (id: number) => api.delete(`keywords/${id}`),
};

export default keywordService;
