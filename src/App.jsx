import { useState, useEffect } from 'react'
import { db } from './services/firebaseConnection'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'

const listRef = collection(db, 'teste')


function App() {
  const [relatorios, setRelatorios] = useState([])
  let lista = []

  useEffect(() => {
    async function loadTexts() {
      const querySnapshot = await getDocs(listRef)
        .then((snapshot) => {
          snapshot.forEach(doc => {
            lista.push({
              id: doc.id,
              data: doc.data().data,
              resp: doc.data().resp,
              categoria: doc.data().categoria,
              loja: doc.data().loja,
              text: doc.data().texto
            })
          })
          if (snapshot.docs.size === 0) {
            console.log('Vazio')
            return
          }
          setRelatorios(lista)
        })
        .catch((err) => {
          console.log('Erro ao ler', err)
        })
    }
    loadTexts()
  }, [])

  const deleteDocument = async (id) => {
    try {
      await deleteDoc(doc(db, "teste", id));
      setRelatorios(relatorios.filter(doc => doc.id !== id));
    } catch (error) {
      console.error("Erro ao deletar documento: ", error);
    }
  };

  const deleteAllDocuments = async () => {
    if (!window.confirm("Tem certeza que deseja apagar todos os registros?")) {
      return;
    }

    try {
      const snapshot = await getDocs(listRef);
      const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));

      await Promise.all(deletePromises);

      setRelatorios([]);
      console.log("Todos os documentos foram deletados.");
    } catch (error) {
      console.error("Erro ao deletar todos os documentos: ", error);
    }
  };


  return (
    <>
      <h1>Documentos</h1>
      <button onClick={deleteAllDocuments} style={{ marginBottom: '10px' }}>
        Deletar Todos
      </button>
      <ul>
        {relatorios.map(doc => (
          <li key={doc.id}>
            <span>{doc.loja}</span>
            <span>: </span>
            <span>{doc.categoria}</span>
            <span> ({doc.text.length})</span>
            <button onClick={() => deleteDocument(doc.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
