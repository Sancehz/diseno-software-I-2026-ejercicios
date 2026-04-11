export default function AmanteCard({ amante }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="avatar">
          {amante.nombre.charAt(0)}
        </div>
        <div className="card-info">
          <h3 className="card-name">{amante.nombre}</h3>
          <span className="card-age">{amante.edad} años</span>
        </div>
      </div>
      <div className="card-interests">
        {amante.intereses.map((interes) => (
          <span key={interes} className="tag">
            {interes}
          </span>
        ))}
      </div>
    </div>
  );
}
