export const createUserObject = (data) => {
  return {
    gender: data.gender,
    email: data.email,
    username: data.login.username,
    password: data.login.password,
    dob: new Date(data.dob.date).toLocaleDateString(),
    age: data.dob.age,
    image: data.picture.large,
    name: data.name.title + " " + data.name.first + " " + data.name.last,
    phone: data.phone,
    cell: data.cell,
    country: data.location.country,
    longitude: +data.location.coordinates.longitude,
    latitude: +data.location.coordinates.latitude,
    address:
      data.location.street.number +
      ", " +
      data.location.street.name +
      ", " +
      data.location.city +
      ", " +
      data.location.state,
  };
};
