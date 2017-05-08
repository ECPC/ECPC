<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Product;
use App\MonthEarning;
class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        //Productos
        $productsNames = [
            'Gigabyte Tarjeta De Video Nvidia Geforce Gt710 2gb Ddr3 Hdmi',
            'Tarjeta De Video Nvidia Pny Gtx 970 4gb DDR4',
            'Tarjeta Video Gigabyte Nvidia Gtx 1080 G1 Gaming 8gb Gddr5x',
            'Tarjeta Madre Gigabyte Ga-z170x Gaming 3 Socket 1151 Intel',
            'Tarjeta Madre Asus B150 PRO GAMING/AURA',
            'Tarjeta Madre ASUS H81M-A',
            'Tarjeta Madre Gigabyte H170-Gaming 3',
            'Procesador Intel Core i7-7700 de Séptima Generación',
            'Procesador Intel Core i5-7400 de Séptima Generación',
            'Procesador Intel Core i3-7100 de Séptima Generación'
        ];
        $productsDescriptions = [
            'Mejora la velocidad de tu PC con la nueva tarjeta gráfica NVIDIA® GeForce® GT 710. Disfruta de hasta 10 veces más el rendimiento que con los gráficos integrados en todas tus aplicaciones de PC. hasta un 80% más de velocidad de juego con total fiabilidad y estabilidad gracias a GeForce® Experience™.',
            'La GeForce GTX 970 es una tarjeta gráfica de alto rendimiento para juegos pesados. Con la Arquitectura NVIDIA Maxwell, maneja tecnología avanzada y de los mejores gráficos para una experiencia de juego increíble.',
            'La serie de tarjeta gráfica GeForce GTX 10 cuenta con la tecnología Pascal para duplicar el rendimiento, en comparación con las tarjetas de gráficos de la generación anterior; además, ofrece nuevas e innovadoras tecnologías de juegos y experiencias de realidad virtual revolucionarias.',
            'Intel Thunderbolt 3 Certified Motherboard. Soporte para procesadores de 7ma y 6ta Generación Intel® Core. Dual Channel DDR4, 4 DIMMs. Intel® USB 3.1 with USB Type-C™ - the world’s next Universal connector',
            'Chipset Intel B150, Soporta: Intel Core i7/Core i5/Core i3/Pentium de Socket 1151, Memoria: DDR4 2133 MHz, 64GB Max, Integrado: Audio HD, Red, USB 3.1 y SATA 3.0, ATX, Ptos: 2xPCIEx16, 2xPCIEx1, 2xPCI.',
            'Chipset Intel H81 Exp., Soporta: Core i7/i5/i3 de Socket 1150, Memoria: DDR3 1600/1333/1066 MHz, 16 GB Max, Integrado: Audio HD, Red, USB 3.0 y SATA 3.0, Micro-ATX, Ptos: 1xPCIEx16, 2xPCIEX1',
            'Chipset Intel H170 Exp., Soporta: Core i7 / i5 de 6ta Gen., Socket 1151, Memoria: DDR4 2133 MHz, 64GB Max, Integrado: Audio HD, Red, USB 3.0 y SATA 3.0, ATX, Ptos: 2xPCIE 3.0 x16, 2xPCIE 3.0 x1. 2xPCI.',
            '3.6 GHz (hasta 4.2 GHz) con Intel HD Graphics 630, Socket 1151, L3 Caché 8 MB, Quad-Core, 14nm.',
            '3.0 GHz (hasta 3.5 GHz) con Intel HD Graphics 630, Socket 1151, L3 Caché 8 MB, Quad-Core, 14nm.',
            '3.9 GHz con Intel HD Graphics 630, Socket 1151, L3 Caché 3 MB, Dual-Core, 14nm.',
        ];
        $productsPrices = [849, 5999, 16995,3049,2499,1099,2499,6699,3899,2499];
        for($i = 1 ; $i < 11; $i++){
            $product = new Product();
            $product->name = $productsNames[$i - 1];
            $product->description = $productsDescriptions[$i - 1];
            $product->image_path = '/img/productos/producto'.$i.'.png';
            $product->price = $productsPrices[$i - 1];
            $product->points = $productsPrices[$i - 1] / 70;
            $product->save();
        }
        //Creando usuarios de prueba con socios y compras
        $user;
        $user = new User();
        $user->name = 'test1';
        $user->email = 'test1@hotmail.com';
        $user->password = bcrypt('test1');
        $user->paymethod = true;
        $user->account_activated = true;
        $user->save();
        MonthEarning::createFictionalHistory($user);
        for($i = 2 ; $i < 6; $i++){
	        $user = new User();
	        $user->name = 'test'.$i;
	        $user->email = 'test'.$i.'@hotmail.com';
	        $user->password = bcrypt('test'.$i);
	        $user->parent_partner = 1;
	        $user->paymethod = true;
        	$user->account_activated = true;
	        $user->save();
        	MonthEarning::createFictionalHistory($user);
        }
        //
    }
}
