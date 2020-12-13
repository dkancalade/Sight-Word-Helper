import { gql, useQuery } from '@apollo/client';

const courses = () => {

  const { loading, error, data } = useQuery(gql`{
    courses
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

export default courses;