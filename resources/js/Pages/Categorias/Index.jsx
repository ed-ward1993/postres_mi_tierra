import { usePage } from '@inertiajs/react';
import { useState } from "react";


const Index = () => {
    const{categorias}=usePage().props;
    console.log(categorias.data);

    const [formulario, setFormulario] = useState(false);
    const [listado, setListado] = useState(true);

    const [operation, setOperation] = useState(1);
    return (
        <div>
            buienvenido
        </div>
    );
};

export default Index;