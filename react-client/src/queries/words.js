// import { gql, useQuery } from '@apollo/client';

// const words = ( listName ) => {

//   const { loading, error, data } = useQuery(gql`
//     words(listName: ${listName}) {
//       name
//       url
//     }`);

//   if (loading) {
//     return loading;
//   }
//   if (error) {
//     return error;
//   }

//     return data;
// };

// export default words;