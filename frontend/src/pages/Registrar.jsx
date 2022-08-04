import { Link } from "react-router-dom"

const Registrar = () => {
    return (
        <>
            <div className="mb-5 md:mb-0">
                <h1 className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y <span className="text-black">Administra tus Pacientes</span></h1>
            </div>

            <div className="border rounded-xl p-5 mt-16 md:mt-0 shadow-lg bg-white">
                <form>
                    <div className="mb-5">
                        <label htmlFor="nombre" className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
                        <input type="text" placeholder="Tu nombre" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" name="nombre" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input type="email" placeholder="Tu email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" name="email" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Contraseña</label>
                        <input type="password" placeholder="Tu contraseña" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" name="password" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="repetirPassword" className="uppercase text-gray-600 block text-xl font-bold">Repetir contraseña</label>
                        <input type="password" placeholder="Repite tu contraseña" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" name="password" />
                    </div>

                    <input type="submit" value="Crear cuenta" className="bg-indigo-700 w-full py-3 px-10 rounded-xl uppercase font-bold text-white mb-5 hover:cursor-pointer hover:bg-indigo-800 xl:w-auto " />
                </form>


                <nav className="xl:flex xl:justify-between">
                    <Link to="/" className="block text-center mb-5 text-gray-500">¿Ya tienes una cuenta? Inicia Sesión</Link>
                    <Link to="/restablecer-password" className="block text-center mb-5 text-gray-500">¿Olvidaste tu contraseña?</Link>
                </nav>
            </div>
        </>
    )
}

export default Registrar