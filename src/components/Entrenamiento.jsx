import { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { data } from './data';



export function Entrenamiento() {
  const [modelo, setModelo] = useState(null);
  const [resultadoPrediccion, setResultadoPrediccion] = useState(null);

  useEffect(() => {
    const entrenarModelo = async () => {
      const input = [];
      const output = [];

      // Recorremos las letras y sus nombres correspondientes
      for (const letra in data[0].letras) {
        const nombres = data[0].letras[letra];
        nombres.forEach(nombre => {
          input.push(letra.charCodeAt(0) / 255); // Normalizamos el valor de la letra
          output.push(nombre.length);
        });
      }

      // Crear un modelo simple
      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

      // Compilar el modelo
      model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

      // Convertir los datos a tensores
      const xs = tf.tensor2d(input, [input.length, 1]);
      const ys = tf.tensor2d(output, [output.length, 1]);

      // Entrenar el modelo
      await model.fit(xs, ys, { epochs: 100 });

      setModelo(model);
    };

    entrenarModelo();
  }, []);

  const predecirLongitud = letra => {
    if (!modelo) return;

    // Normalizar el valor numérico de la letra
    const valorNormalizado = letra.charCodeAt(0) / 255;

    // Realizar la predicción con el valor normalizado
    const resultado = modelo.predict(tf.tensor2d([valorNormalizado], [1, 1]));

    setResultadoPrediccion(resultado.dataSync()[0]);
  };

  return (
    <>
      <h1>Entrenamiento</h1>
      <button onClick={() => predecirLongitud('Ñ')}>Predecir longitud de a</button>
      <p>Resultado de la predicción: {resultadoPrediccion}</p>
    </>
  );
}