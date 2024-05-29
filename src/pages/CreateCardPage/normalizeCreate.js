const normalizeCreate = (data) => {
    return {
    title: data.title,
    subtitle: data.subTitle,
    description: data.description,
    phone: data.phone,
    email: data.email,
    web: data.web,
    image:{
        url: data.url,
        alt: data.alt,
    },
    images: data.images,
  };
};

export default normalizeCreate;