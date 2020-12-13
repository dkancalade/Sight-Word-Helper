import { gql, useQuery } from '@apollo/client';

const wordLists = (course) => {

  const { loading, error, data } = useQuery(gql`
  course(name: ${course}) {
    name
  }`);

  if (loading) {
    return loading;
  }
  if (error) {
    return error;
  }
  if (data) {
    return data;
  }
  return null;
}

export default wordLists;