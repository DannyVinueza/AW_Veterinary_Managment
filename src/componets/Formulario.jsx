import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthProvider";
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Formulario = ({ paciente }) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({});
  const nombreValido = (value) => {
    const regex = /^[A-Za-z]+$/; // Expresión regular que permite solo letras
    return regex.test(value) || "El nombre de la mascota solo debe contener letras";
  };

  // Define el esquema de validación utilizando Yup
  const validationSchema = Yup.object().shape({
        nombre: Yup.string()
      .required("El nombre de la mascota es obligatorio")
      .test("nombreValido", "El nombre de la mascota solo debe contener letras", nombreValido),
    propietario: Yup.string().required("El nombre del propietario es obligatorio"),
    email: Yup.string().email("Correo electrónico no válido").required("El correo electrónico es obligatorio"),
    celular: Yup.number().required("El número de celular es obligatorio"),
    convencional: Yup.number().required("El número convencional es obligatorio"),
    salida: Yup.date().required("La fecha de salida es obligatoria"),
    sintomas: Yup.string().required("Los síntomas son obligatorios"),
  });

  // Define los valores iniciales del formulario
  const initialValues = {
    nombre: paciente?.nombre || "",
    propietario: paciente?.propietario || "",
    email: paciente?.email || "",
    celular: paciente?.celular || "",
    convencional: paciente?.convencional || "",
    salida: paciente?.salida ? new Date(paciente.salida).toLocaleDateString("en-CA", { timeZone: "UTC" }) : "",
    sintomas: paciente?.sintomas || "",
  };

  // Hook de Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem('token');
        values.id = auth._id;
        const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/registro`;
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.post(url, values, options);
        navigate('/dashboard/listar');
      } catch (error) {
        setMensaje({ respuesta: error.response?.data.msg, tipo: false });
        setTimeout(() => {
          setMensaje({});
        }, 3000);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
      
      <div className="mb-5">
        <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">
          Nombre de la mascota:
        </label>
        <input
          id="nombre"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          placeholder="nombre de la mascota"
          name="nombre"
          value={formik.values.nombre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.nombre && formik.errors.nombre && (
          <div className="text-red-500 text-sm">{formik.errors.nombre}</div>
        )}
      </div>
      
      <div className="mb-5">
        <label htmlFor="propietario" className="text-gray-700 uppercase font-bold text-sm">
          Nombre del propietario:
        </label>
        <input
          id="propietario"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          placeholder="nombre del propietario"
          name="propietario"
          value={formik.values.propietario}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.propietario && formik.errors.propietario && (
          <div className="text-red-500 text-sm">{formik.errors.propietario}</div>
        )}
      </div>
      
      <div className="mb-5">
        <label htmlFor="email" className="text-gray-700 uppercase font-bold text-sm">
          Email:
        </label>
        <input
          id="email"
          type="email"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          placeholder="email del propietario"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
      </div>
      
      <div className="mb-5">
        <label htmlFor="celular" className="text-gray-700 uppercase font-bold text-sm">
          Celular:
        </label>
        <input
          id="celular"
          type="number"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          placeholder="celular del propietario"
          name="celular"
          value={formik.values.celular}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.celular && formik.errors.celular && (
          <div className="text-red-500 text-sm">{formik.errors.celular}</div>
        )}
      </div>
      
      <div className="mb-5">
        <label htmlFor="convencional" className="text-gray-700 uppercase font-bold text-sm">
          Convencional:
        </label>
        <input
          id="convencional"
          type="number"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          placeholder="convencional del propietario"
          name="convencional"
          value={formik.values.convencional}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.convencional && formik.errors.convencional && (
          <div className="text-red-500 text-sm">{formik.errors.convencional}</div>
        )}
      </div>
      
      <div className="mb-5">
        <label htmlFor="salida" className="text-gray-700 uppercase font-bold text-sm">
          Fecha de salida:
        </label>
        <input
          id="salida"
          type="date"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          placeholder="salida"
          name="salida"
          value={formik.values.salida}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.salida && formik.errors.salida && (
          <div className="text-red-500 text-sm">{formik.errors.salida}</div>
        )}
      </div>
      
      <div className="mb-5">
        <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold text-sm">
          Síntomas:
        </label>
        <textarea
          id="sintomas"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
          placeholder="Ingrese los síntomas de la mascota"
          name="sintomas"
          value={formik.values.sintomas}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.sintomas && formik.errors.sintomas && (
          <div className="text-red-500 text-sm">{formik.errors.sintomas}</div>
        )}
      </div>

      <input
        type="submit"
        className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all"
        value={paciente?._id ? "Actualizar paciente" : "Registrar paciente"}
      />
    </form>
  );
};
