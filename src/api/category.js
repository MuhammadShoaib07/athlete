// axios import
// headers import
// axios.create({
//     header
// })
// write getCategory(categoryData) {
return axios.post(
  "http://localhost:8000/api/v1//admin/categories/${categoryId}",
  data
);
// axios(
//     `http://localhost:8000/api/v1//admin/categories/${categoryId}`,
//     {
//       method: "POST",
//       headers: {
//         "content-type": "multipart/form-data",
//         Authorization: token,
//       },
//       data: categoryData,
//     }
//   )
// }

// export default {
//     getCategory
// }
