import { useModel } from "@mohism/core"

// 禁用词列表
export default async () => {
  const list = await useModel('black').find({}, {
    _id: 0,
    createdAt: 0,
    updatedAt: 0,
  });
  return list;
}