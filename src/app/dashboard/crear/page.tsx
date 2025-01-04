"use client";
import { agregarProducto } from "@/lib/firebase/baseClient";

import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { arrayCategory } from "@/app/utility/categorias";
import { Productos } from "@/Productos";

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



const crear = () => {


  const [categorias, setCategorias] = useState<string[]>([]);
  const [estado, setEstado] = useState("1");
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

  const subtmitForm =(formData:FormData) => {
    console.log(formData);
    

    let prod:Productos = {} as Productos;
    prod.descripcion=formData.get("title")?.toString() ?? "";
    prod.p_Unitario_final = formData.get("price")?.toString() ??  "";
    prod.codigo = formData.get( "cod")?.toString() ?? "";
    prod.cantidad = parseInt(formData.get("cant")?.toString() ?? "0")
    prod.categoria = categorias;
    prod.estado = formData.get("estado") =="1"? true : false;
    // if(Object.keys(formData.getAll()).length === 0){
    //       console.log("vacio");
          
    // }
    agregarProducto(prod);
   // console.log(prod);
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
            required
            
          />
          <TextField
            id="outlined-basic"
            type="number"
            name="price"
            label="Precio"
            variant="outlined"
            size="small" required
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            type="number"
            name="cod"
            label="Codigo"
            variant="outlined"
            size="small"
            required
          />
          <TextField
            id="outlined-basic"
            type="number"
            name="cant"
            label="Cantidad"
            variant="outlined"
            size="small"
            required
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
              <MenuItem key={name} value={name}>
                <Checkbox checked={categorias.includes(name)} />
                <ListItemText primary={name} />
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
        <button type="submit">Agregar</button>
      </form>
    </main>
  );
};

export default crear;
