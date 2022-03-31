import React  from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import SelectInput from '../principal/SelectInput'

const LoginSchema = Yup.object().shape({
  nome: Yup.string().required('Obrigatório'),
  idade: Yup.number().required('Obrigatório').min(17, 'Tem que ser maior de 16 anos!'),
  cpf: Yup.string().required('Obrigatório').min(14, 'CPF deve ter tamanho 14! (000.000.000-00)').max(14, 'CPF deve ter tamanho 14! (000.000.000-00)').matches(/^[0-9\s\.\-]*$/,'CPF só pode conter números, traço e ponto. (000.000.000-00)'),
  matricula: Yup.string().required('Obrigatório').min(9, 'Matrícula must be size 9!').max(9, 'Matrícula must be size 9!').matches(/^[0-9\s]*$/, 'Só pode conter números.'), 
  curso: Yup.string().required('Obrigatório'),
  endereco: Yup.string().required('Obrigatório'),
  numero: Yup.string(),
  complemento: Yup.string(),
  bairro: Yup.string().required('Obrigatório'),
  cidade: Yup.string().required('Obrigatório'),
  estado: Yup.string().required('Obrigatório'),
  cep: Yup.string().required('Obrigatório').min(9, 'CEP deve ter tamanho 9! (00000-000)').max(9, 'CEP deve ter tamanho 9! (00000-000)').matches(/^[0-9\s\-]*$/, 'CEP só pode conter números e traços. (00000-000)')
});

const FormYupValidation = () => {
  const handleSubmitting = (values, { setSubmitting, setStatus }) => {
    setStatus({ isValidating: true });
    setTimeout(() => {
      console.info(JSON.stringify(values, null, 2));
      setSubmitting(false);
      setStatus({ isValidating: false });
    }, 400);
    alert(JSON.stringify(values))
  };

  const options = [
    { value: "rondonia", label: 'Rondonia'},
    { value: "acre", label: 'Acre'},
    { value: "amazonas", label: 'Amazonas'},
    { value: "roraima", label: 'Roraima'},
    { value: "para", label: 'Para'},
    { value: "amapa", label: 'Amapa'},
    { value: "tocantis", label: 'Tocantis'},
    { value: "maranhao", label: 'Maranhao'},
    { value: "piaui", label: 'Piaui'},
    { value: "ceara", label: 'Ceara'},
    { value: "norte", label: 'Rio Grande do Norte'},
    { value: "paraiba", label: 'Paraiba'},
    { value: "pernambuco", label: 'Pernambuco'},
    { value: "alagoas", label: 'Alagoas'},
    { value: "sergipe", label: 'Sergipe'},
    { value: "bahia", label: 'Bahia'},
    { value: "minas", label: 'Minas Gerais'},
    { value: "espirito", label: 'Espirito Santo'},
    { value: "rio", label: 'Rio de Janeiro'},
    { value: "saopaulo", label: 'Sao Paulo'},
    { value: "parana", label: 'Parana'},
    { value: "santacatarina", label: 'Santa Catarina'},
    { value: "sul", label: 'Rio Grande do Sul'},
    { value: "matogrossosul", label: 'Matogrosso do Sul'},
    { value: "matogrossonorte", label: 'Matogrosso do Norte'},
    { value: "goias", label: 'Goias'},
    { value: "brasilia", label: 'Brasilia'}
  ]  

  const styleBody = {  
    padding: '100px',
    backgroundColor: 'rgb(188, 177, 207)'
  };

  return (
    <Formik
      validationSchema={LoginSchema}
      initialValues={{ nome: '', idade: '', cpf: '', matricula: '', curso: '', endereco: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', cep: ''}}
      onSubmit={handleSubmitting}
    >
      {({
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
        <div className="container" style={styleBody} >
        <form  onSubmit={handleSubmit} className="centered">
          <div className="form-group">
            Nome completo*:
            <Field className="form-control" type="text" name="nome"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </div>
          <ErrorMessage name="nome" className="error" component="span"/>
          <br/><br/>
          <div  className="form-group">
            Idade*:
            <Field className="form-control" type="number" name="idade"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </div>
          <ErrorMessage name="idade" className="error" component="span" />
          <br/><br/>
          <div  className="form-group">
            CPF*:
            <Field className="form-control" type="text" name="cpf"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </div>
          <ErrorMessage name="cpf" className="error" component="span"/>
          <br/><br/>
          <div  className="form-group">
            Matrícula*:
            <Field className="form-control" type="text" name="matricula"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </div>
          <ErrorMessage name="matricula" className="error" component="span"/>
          <br/><br/>
          <div  className="form-group">
            Curso*:
            <Field className="form-control" type="text" name="curso"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </div>
          <ErrorMessage name="curso" className="error" component="span"/>
          <br/><br/>
          <div  className="form-group">
            Endereço*:
            <Field className="form-control" type="text" name="endereco"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </div>
          <ErrorMessage name="endereco" className="error" component="span"/>
          <br/><br/>
          <div  className="form-group">
            Número:
            <Field className="form-control" type="text" name="numero"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </div>
          <ErrorMessage name="numero" className="error" component="span"/>
          <br/><br/>
          <div  className="form-group">
            Complemento:
            <Field className="form-control" type="text" name="complemento"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </div>
          <ErrorMessage name="complemento" className="error" component="span"/>
          <br/><br/>
          <div  className="form-group">
            Bairro*:
            <Field className="form-control" type="text" name="bairro"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </div>
          <ErrorMessage name="bairro" className="error" component="span"/>
          <br/><br/>
          <div  className="form-group">
            Cidade*:
            <Field className="form-control" type="text" name="cidade"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </div>
          <ErrorMessage name="cidade" className="error" component="span"/>
          <br/><br/>
          <div  className="form-group">
            Estado*:
            <SelectInput name="estado">
              {options.map((option) => (
              <option key={option.value} value={option.value}>
                  {option.label}
              </option>
              ))}
            </SelectInput>
          </div>
          <ErrorMessage name="estado" className="error" component="span"/>
          <br/><br/>
          <div  className="form-group">
            CEP*:
            <Field className="form-control" type="text" name="cep"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </div>
          <ErrorMessage name="cep" className="error" component="span"/>
          <br/><br/>
          <input type="submit" value="Enviar" className="btn btn-primary"disabled={isSubmitting}/>
        </form>
        </div>
      )}
    </Formik>
  )
};

export default FormYupValidation;