class SaveUserDTO {
  constructor(payload) {
    this.first_name =
      payload.name ||
      payload.first_name ||
      payload.firstname ||
      payload.firstName;
    this.last_name =
      payload.lastname ||
      payload.last_name ||
      payload.lastname ||
      payload.lastName;
    this.age =
      payload.age ||
      payload.user_age ||
      payload.ageUser ||
      payload.ageuser ||
      payload.userAge ||
      payload.userage ||
      payload.age_user;
    this.email =
      payload.email ||
      payload.mail ||
      payload.emailUser ||
      payload.emailuser ||
      payload.mailUser ||
      payload.mailuser;
    this.password = payload.password;
    this.role = payload.role || payload.rol;
  }
}

module.exports = SaveUserDTO;
