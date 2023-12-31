import React from 'react';
import { usePage } from '@inertiajs/inertia-react';

const TablaPostres = () => {
    const {postres} = usePage().props;
    console.log(postres);
    return (
        <div>
             <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border only:text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                    <th className="px-4 py-3 border">#</th>
                                    <th className="px-4 py-3 border">Nombre</th>
                                    <th className="px-4 py-3 border">Nombre Base Datos</th>
                                    <th className="px-4 py-3 border">Url Logo</th>
                                    <th className="px-4 py-3 border">Url Produccion</th>
                                    <th className="px-4 py-3 border">Direccion</th>
                                    <th className="px-4 py-3 border">Nit</th>
                                    <th className="px-4 py-3 border">Estado</th>
                                    <th className="px-4 py-3 border">Fecha</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {postres.map((data, index) => (
                                      <tr key={data.id} className="text-gray-700">
                                      <td className="px-4 py-3 border">{index + 1}</td>
                                      <td className="px-4 py-3 border">
                                          <div className="flex items-center text-sm">
                                              <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                                  <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                                                  <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                              </div>
                                              <div>
                                                  <p className="font-semibold text-black">{data.nombre}</p>
                                                  <p className="text-xs text-gray-600">Developer</p>
                                              </div>
                                          </div>
                                      </td>
                                      <td className="px-4 py-3 text-ms font-semibold border">{data.nombre_db}</td>
                                      <td className="px-4 py-3 text-ms font-semibold border">{data.url_logo}</td>
                                      <td className="px-4 py-3 text-ms font-semibold border">{data.url_produccion}</td>
                                      <td className="px-4 py-3 text-ms font-semibold border">{data.direccion}</td>
                                      <td className="px-4 py-3 text-ms font-semibold border">{data.nit}</td>
                                      <td className="px-4 py-3 text-xs border">
                                          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Acceptable </span>
                                      </td>
                                      <td className="px-4 py-3 text-sm border">6/4/2000</td>
                                  </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    );
}

export default TablaPostres;
