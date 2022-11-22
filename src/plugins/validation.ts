import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage,
  configure,
} from "vee-validate";

export default {
  install(app: any) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("VeeErrorMessage", ErrorMessage);

    configure({
      validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
      validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
      validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
      validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
    });
  },
};
