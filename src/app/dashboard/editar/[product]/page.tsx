"use client";
import {categoryProductTurso, editProduct, editProductTurso, productBySlug, productBySlugTurso } from "@/lib/firebase/baseClient";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { Category, Productos, ProductosDB, ProductosDBconCat, ProductosDBconCatnum } from "@/Productos";
import slug from "slug";
import { redirect } from "next/navigation";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



const editar = ({params}:{params:{product:string}}) => {
const {product} = params;
const [producto, setProduct] = useState<ProductosDBconCat>();  
const [categorias, setCategorias] = useState<string[]>([]);
const [estado, setEstado] = useState("1");
const [cat, setcat] = useState<{ [key: string]: number }>({});
  const [arrayCategory, setarrayCategory] = useState<Category[]>([]);
  

 
  
useEffect(()=> {
  const queryProuct = async ()=> {
    const productoDB = await productBySlugTurso(product);
    const cat = await categoryProductTurso();
      setarrayCategory(cat);
      setcat(Object.fromEntries(cat.map(({id_categoria,categoria}:Category)=>[categoria,id_categoria])));



    // setProduct(productoDB);
    // setCategorias(productoDB.categorias.map(cat => cat.categoria))

    setEstado(productoDB.estado ? "1": "0");
  }
  queryProuct();
  },[product]); 
 
  console.log(categorias);

  const handleChange2 = (event: SelectChangeEvent) => {
    setEstado(event.target.value);
  };
  const handleChange = (event: SelectChangeEvent<typeof categorias>) => {
    const {
      target: { value },
    } = event;
    setCategorias(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const subtmitForm = async (formData:FormData) => {
    console.log( categorias.map(elem => cat[elem]));

    let prod:ProductosDBconCatnum = {} as ProductosDBconCatnum;

    prod.descripcion=formData.get("title")?.toString() ?? "";
    prod.precio = formData.get("price")?.toString() ??  "";
    prod.codigo = formData.get( "cod")?.toString() ?? "";
    prod.cantidad = parseInt(formData.get("cant")?.toString() ?? "0");
    prod.categorias = categorias.map(elem => cat[elem]);
    prod.estado = formData.get("estado") =="1"? true : false;
    prod.queryLink = slug(formData.get("title")?.toString() ?? "");
    
    // if(Object.keys(formData.getAll()).length === 0){
    //       console.log("vacio");
          
    // }
    console.log(prod)

  if(producto ){
    if( await editProductTurso(producto?.id_mate ,prod )){
      redirect('/dashboard/admin');
    }
  }
      

  }

  return (
    <main className="container">
      <h1>Agregar Producto</h1>
      <form action={subtmitForm} method="post">
        <div>
          <TextField
            id="outlined-basic"
            name="title"
            label="Titulo"
            variant="outlined"
            size="small"
            defaultValue={producto?.descripcion}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            required
            
          />
          <TextField
            id="outlined-basic"
            type="text"
            name="price"
            label="Precio"
            variant="outlined"
            size="small"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            required
            defaultValue= {producto?.precio}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            name="cod"
            label="Codigo"
            variant="outlined"
            size="small"
            required
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            defaultValue={producto?.codigo}
          />
          <TextField
            id="outlined-basic"
            type="number"
            name="cant"
            label="Cantidad"
            variant="outlined"
            size="small"
            required
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            defaultValue={producto?.cantidad }
          />
        </div>

        <FormControl sx={{ m: 1, width: 300 }} size="small">
          <InputLabel id="demo-multiple-checkbox-label">Categoria</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            name="categoria"
            multiple
            value={categorias}
            onChange={handleChange}
            input={<OutlinedInput label="Categoria" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {arrayCategory.map((name) => (
              <MenuItem key={name.id_categoria} value={name.categoria}>
                <Checkbox checked={categorias.includes(name.categoria)} />
                <ListItemText primary={name.categoria} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <section>

          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-multiple-checkbox-label">Estado</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={estado}
              name="estado"
              label="Estado"
              onChange={handleChange2}
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              
              <MenuItem value={1}>Activo</MenuItem>
              <MenuItem value={0}>Inactivo</MenuItem>

            </Select>
          </FormControl>
        </section>
        <button type="submit">Guardar</button>
      </form>
    </main>
  );
};

export default editar;
