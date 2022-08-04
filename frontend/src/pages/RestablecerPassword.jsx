import { Link } from "react-router-dom"

const RestablecerPassword = () => {
    return (
        <>
            <div className="mb-5 md:mb-0">
                <h1 className="text-indigo-600 font-black text-6xl">Recupera tu Cuenta y no Pierdas el <span className="text-black">Acceso a tus Pacientes</span></h1>
            </div>

            <div className="border rounded-xl p-5 mt-16 md:mt-0 shadow-lg bg-white">
                <form>
                    <div className="mb-5">
                        <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input type="email" placeholder="Tu email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" name="email" />
                    </div>

                    <input type="submit" value="Envíar correo" className="bg-indigo-700 w-full py-3 px-10 rounded-xl uppercase font-bold text-white mb-5 hover:cursor-pointer hover:bg-indigo-800 xl:w-auto " />
                </form>

                <nav className="xl:flex xl:justify-between">
                    <Link to="/" className="block text-center mb-5 text-gray-500">¿Ya tienes una cuenta? Inicia Sesión</Link>
                    <Link to="/registrar" className="block text-center mb-5 text-gray-500">¿No tienes una cuenta? Regístrate</Link>
                </nav>
            </div>
        </>
    )
}

export default RestablecerPassword