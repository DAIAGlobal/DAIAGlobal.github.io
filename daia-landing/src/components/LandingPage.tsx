import React from "react";

export default function DAIAHoldingLanding() {
  return (
    <main style={{padding:32, fontFamily: 'system-ui, sans-serif'}}>
      <header style={{display:'flex',alignItems:'center',gap:16}}>
        <img src="/icon.svg" alt="DAIA" width={56} height={56} />
        <div>
          <h1 style={{margin:0}}>DAIA Holding</h1>
          <p style={{margin:0,color:'#555'}}>Infraestructura y Tecnología B2B</p>
        </div>
      </header>

      <section style={{marginTop:24}}>
        <p>
          Bienvenido a DAIA Holding. Especializados en infraestructura cloud,
          desarrollo de software, soporte técnico y análisis de datos.
        </p>
      </section>
    </main>
  );
}
