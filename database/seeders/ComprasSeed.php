<?php

namespace Database\Seeders;

use App\Models\Compras;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ComprasSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::connection('dinamico')->table('compras')->insert(
            [
                [
                    'id_usuario' => 1,
                    'fecha' => '2023-08-01',
                    'medio_pago' => 'Tarjeta de crédito',
                    'comentario' => 'Compra de tartas para evento',
                    'estado' => true,
                ],
                [
                    'id_usuario' => 2,
                    'fecha' => '2023-08-02',
                    'medio_pago' => 'Efectivo',
                    'comentario' => 'Compra de galletas para el hogar',
                    'estado' => true,
                ],
                [
                    'id_usuario' => 2,
                    'fecha' => '2023-08-03',
                    'medio_pago' => 'Transferencia bancaria',
                    'comentario' => 'Compra de helados para celebración',
                    'estado' => true,
                ],
                [
                    'id_usuario' => 1,
                    'fecha' => '2023-08-04',
                    'medio_pago' => 'PayPal',
                    'comentario' => 'Compra de postres sin azúcar',
                    'estado' => true,
                ],
                [
                    'id_usuario' => 2,
                    'fecha' => '2023-08-05',
                    'medio_pago' => 'Tarjeta de débito',
                    'comentario' => 'Compra de pasteles para fiesta',
                    'estado' => true,
                ]
            ]
        );
    }
}
