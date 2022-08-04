const Alerta = ({ alerta }) => {
    const tipo = alerta.error ? 'bg-red-600' : 'bg-green-600'

    return (
        <div className={tipo + ' bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-5 bg-'}>
            {alerta.msg}
        </div >
    )
}

export default Alerta