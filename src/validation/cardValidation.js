import Joi from "joi";

const phoneRegex = /^(?:0(?!([5,7,8]))[2-4]|[0][5,7,8,9]|(?:\+972|972|0))[-\s\/]?(([2-4]{1}\d{7})|([5,7,8]{1}\d{7})|([9]{1}\d{8}))$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

const titleSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
});
const subTitleSchema = Joi.object({
  subtitle: Joi.string().min(2).max(256).required(),
});
const descriptionSchema = Joi.object({
  description: Joi.string().min(2).max(4000).required(),
});
const phoneSchema = Joi.object({
  phone: Joi.string().pattern(phoneRegex).required(),
});
const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
});
const webSchema = Joi.object({
  web: Joi.string().pattern(urlRegex).required(),
});
const urlSchema = Joi.object({
  url: Joi.string().pattern(urlRegex).required(),
});
const altSchema = Joi.object({
  alt: Joi.string().min(2).max(256).required(),
});
const imagesSchema = Joi.object({
  images: Joi.array(),
});



const validateTitleSchema = (title) => titleSchema.validate(title);
const validateSubTitleSchema = (subTitle) => subTitleSchema.validate(subTitle);
const validateDescriptionSchema = (description) => descriptionSchema.validate(description);
const validatePhoneSchema = (phone) => phoneSchema.validate(phone);
const validateEmailSchema = (email) => emailSchema.validate(email);
const validateWebSchema = (web) => webSchema.validate(web);
const validateUrlSchema = (url) => urlSchema.validate(url);
const validateAltSchema = (alt) => altSchema.validate(alt);
const validateImagesSchema = (images) => imagesSchema.validate(images);


const validateSchema = {
  title: validateTitleSchema,
  subtitle: validateSubTitleSchema,
  description: validateDescriptionSchema,
  phone: validatePhoneSchema,
  email: validateEmailSchema,
  web: validateWebSchema,
  url: validateUrlSchema,
  alt: validateAltSchema,
  images: validateImagesSchema,
};

export default validateSchema;