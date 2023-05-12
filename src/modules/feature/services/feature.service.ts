import api from "../../../services/api";
import { CreateFeatureInterface } from "../interfaces/create-feature.interface";
import { UpdateFeatureInterface } from "../interfaces/update-feature.interface";

const featureService = {
  getAll: () => api.get("features"),
  getOne: (id: number) => api.get(`features/${id}`),
  create: (data: CreateFeatureInterface) => api.post("features", data),
  update: (id: number, data: UpdateFeatureInterface) =>
    api.put(`features/${id}`, data),
  delete: (id: number) => api.delete(`features/${id}`),
};

export default featureService;
