// ============================================
// ERA 1 SISTEMAS OPERATIVOS II
// Script Principal - Lógica Interactiva
// ============================================

// Estado global de la aplicación
const appState = {
    menuAbierto: false,
    quizzesRespondidos: {},
};

// ========== INICIALIZACIÓN ========== 
document.addEventListener('DOMContentLoaded', function() {
    inicializarEventos();
    generarQuizzes();
    inicializarBotonesAcordeon();
    actualizarMenuActivo();
});

// ========== EVENTOS PRINCIPALES ========== 
function inicializarEventos() {
    // Menú lateral
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenuLateral);
    }
    
    // Botón volver arriba
    const btnVolverArriba = document.getElementById('btnVolverArriba');
    if (btnVolverArriba) {
        btnVolverArriba.addEventListener('click', volverAlInicio);
        window.addEventListener('scroll', actualizarBotonVolverArriba);
    }
    
    // Barra de progreso
    window.addEventListener('scroll', actualizarProgresoLectura);
    window.addEventListener('scroll', actualizarMenuActivo);
    
    // Menú items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            cerrarMenuLateral();
        });
    });
}

// ========== MENÚ LATERAL ========== 
function toggleMenuLateral() {
    const menu = document.getElementById('menuLateral');
    appState.menuAbierto = !appState.menuAbierto;
    
    if (appState.menuAbierto) {
        menu.classList.add('activo');
    } else {
        menu.classList.remove('activo');
    }
}

function cerrarMenuLateral() {
    const menu = document.getElementById('menuLateral');
    appState.menuAbierto = false;
    menu.classList.remove('activo');
}

function actualizarMenuActivo() {
    const menuItems = document.querySelectorAll('.menu-item');
    const secciones = document.querySelectorAll('section[id]');
    
    let seccionActual = 'portada';
    
    secciones.forEach(seccion => {
        const top = seccion.offsetTop - 100;
        const bottom = top + seccion.offsetHeight;
        
        if (window.scrollY >= top && window.scrollY < bottom) {
            seccionActual = seccion.getAttribute('id');
        }
    });
    
    menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + seccionActual) {
            item.classList.add('active');
        }
    });
}

// ========== BARRA DE PROGRESO ========== 
function actualizarProgresoLectura() {
    const body = document.body;
    const html = document.documentElement;
    const windowHeight = window.innerHeight;
    const docHeight = html.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progreso = (scrolled / docHeight) * 100;
    
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = progreso + '%';
    }
    
    // Actualizar porcentaje de lectura
    const porcentajeLectura = document.getElementById('porcentajeLectura');
    if (porcentajeLectura) {
        porcentajeLectura.textContent = Math.round(progreso);
    }
}

// ========== BOTÓN VOLVER ARRIBA ========== 
function actualizarBotonVolverArriba() {
    const btnVolverArriba = document.getElementById('btnVolverArriba');
    if (!btnVolverArriba) return;
    
    if (window.scrollY > 300) {
        btnVolverArriba.classList.add('visible');
    } else {
        btnVolverArriba.classList.remove('visible');
    }
}

function volverAlInicio() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ========== ACORDEONES ========== 
function inicializarBotonesAcordeon() {
    const botonesAcordeon = document.querySelectorAll('.accordion-btn');
    
    botonesAcordeon.forEach(boton => {
        boton.addEventListener('click', function() {
            const idContent = this.getAttribute('data-accordion');
            const content = document.getElementById(idContent);
            
            if (!content) return;
            
            // Cerrar otros acordeones en la misma sección
            const secciones = this.closest('.bloque-componentes');
            if (secciones) {
                const otrosBotones = secciones.querySelectorAll('.accordion-btn');
                otrosBotones.forEach(otroBoton => {
                    if (otroBoton !== this) {
                        otroBoton.classList.remove('active');
                        const otroContent = document.getElementById(
                            otroBoton.getAttribute('data-accordion')
                        );
                        if (otroContent) {
                            otroContent.classList.remove('show');
                        }
                    }
                });
            }
            
            // Toggle del acordeón actual
            this.classList.toggle('active');
            content.classList.toggle('show');
        });
    });
}

// ========== ESTRUCTURA DE QUIZZES ========== 
const datosQuizzes = {
    'quiz-tema1': [
        {
            pregunta: "¿Cuál es la función principal del kernel en un sistema operativo?",
            opciones: [
                "Proporcionar interfaz gráfica al usuario",
                "Administrar el hardware y los recursos del sistema",
                "Ejecutar aplicaciones de usuario",
                "Crear archivos en el disco duro"
            ],
            correcta: 1,
            explicacion: "El kernel es el núcleo del SO que tiene acceso directo al hardware y es responsable de administrar todos los recursos como el procesador, memoria y dispositivos."
        },
        {
            pregunta: "¿Qué es la multiprogramación?",
            opciones: [
                "Escribir un programa en múltiples lenguajes",
                "Ejecutar múltiples programas simultáneamente en el procesador",
                "Programar para múltiples sistemas operativos",
                "Usar múltiples procesadores al mismo tiempo"
            ],
            correcta: 1,
            explicacion: "La multiprogramación permite que múltiples programas residan en memoria y se intercalen en su ejecución en el procesador mediante cambios de contexto."
        },
        {
            pregunta: "¿Cuál es la diferencia entre un SO monousuario y uno multiusuario?",
            opciones: [
                "El monousuario es más rápido",
                "El monousuario permite un usuario, el multiusuario permite múltiples usuarios simultáneamente",
                "El multiusuario requiere más hardware",
                "No hay diferencia real, solo es publicidad"
            ],
            correcta: 1,
            explicacion: "Un SO monousuario está diseñado para un solo usuario, mientras que un SO multiusuario permite que múltiples usuarios accedan simultáneamente con mecanismos de protección y autenticación."
        },
        {
            pregunta: "¿Qué es la abstracción en los sistemas operativos?",
            opciones: [
                "Una forma de comprimir datos",
                "Ocultar la complejidad del hardware y proporcionar una interfaz simplificada",
                "Un error en el código",
                "Una característica de los antivirus"
            ],
            correcta: 1,
            explicacion: "La abstracción es la capacidad del SO de ocultar los detalles complejos del hardware y proporcionar interfaces simplificadas que los programadores pueden usar fácilmente."
        },
        {
            pregunta: "¿Cuáles son las tres dimensiones principales de clasificación de sistemas operativos?",
            opciones: [
                "Tamaño, color y precio",
                "Velocidad, memoria y procesador",
                "Número de usuarios, procesadores e interacción",
                "Antigüedad, marca y rendimiento"
            ],
            correcta: 2,
            explicacion: "Los SO se clasifican principalmente por: número de usuarios (monousuario/multiusuario), número de procesadores (monoprocesador/multiprocesador), y tipo de interacción (lote/interactivo/tiempo real)."
        }
    ],
    'quiz-tema2': [
        {
            pregunta: "¿Cuál es la diferencia principal entre un sistema multiprocesador y uno distribuido?",
            opciones: [
                "Ubicación de procesadores (misma máquina vs diferentes máquinas)",
                "Velocidad del procesador",
                "Cantidad de memoria",
                "Sistema operativo usado"
            ],
            correcta: 0,
            explicacion: "En multiprocesadores, múltiples CPUs comparten memoria y están en la misma máquina. En distribuidos, están en máquinas diferentes conectadas por red."
        },
        {
            pregunta: "¿Qué es UMA en multiprocesadores?",
            opciones: [
                "Unique Memory Architecture",
                "Uniform Memory Access",
                "Universal Management Architecture",
                "User Mode Architecture"
            ],
            correcta: 1,
            explicacion: "UMA (Uniform Memory Access) significa que todos los procesadores tienen la misma latencia de acceso a cualquier posición de memoria."
        },
        {
            pregunta: "¿Cuál es una ventaja de los sistemas distribuidos?",
            opciones: [
                "Menor latencia de comunicación",
                "Escalabilidad y tolerancia a fallos",
                "Sincronización más simple",
                "Menor costo de comunicación"
            ],
            correcta: 1,
            explicacion: "Los sistemas distribuidos pueden escalar agregando más máquinas y tolerar fallos de máquinas individuales."
        },
        {
            pregunta: "En NUMA, la latencia de acceso a memoria es:",
            opciones: [
                "Uniforme para todos los procesadores",
                "Variable, dependiendo del procesador y ubicación de memoria",
                "Siempre alta",
                "Siempre baja"
            ],
            correcta: 1,
            explicacion: "NUMA (Non-Uniform Memory Access) tiene latencia variable: acceso local es rápido, remoto es lento."
        },
        {
            pregunta: "¿Qué es MPP?",
            opciones: [
                "Multi-Processor Platform",
                "Massively Parallel Processor",
                "Memory Performance Protocol",
                "Multi-Purpose Program"
            ],
            correcta: 1,
            explicacion: "MPP (Massively Parallel Processor) es una arquitectura con cientos o miles de procesadores, cada uno con memoria local."
        }
    ],
    'quiz-tema3': [
        {
            pregunta: "¿Qué es un Bloque de Control de Proceso (PCB)?",
            opciones: [
                "Un archivo que contiene el código del programa",
                "Una estructura de datos que el SO mantiene para cada proceso",
                "El procesador que ejecuta el proceso",
                "Una instrucción para cambiar de proceso"
            ],
            correcta: 1,
            explicacion: "El PCB almacena información crítica del proceso: PID, estado, registros, contador de programa, memoria, permisos, etc."
        },
        {
            pregunta: "En el diagrama de estados de procesos, ¿qué transición ocurre cuando un proceso solicita E/S?",
            opciones: [
                "Nuevo → Listo",
                "Ejecutando → Bloqueado",
                "Listo → Ejecutando",
                "Bloqueado → Nuevo"
            ],
            correcta: 1,
            explicacion: "Cuando un proceso ejecuta una operación de E/S bloqueante, transiciona de Ejecutando a Bloqueado hasta que la E/S completa."
        },
        {
            pregunta: "¿Cuál es el contexto de un proceso?",
            opciones: [
                "El programa que ejecuta",
                "La información del SO necesaria para pausar y reanudar el proceso",
                "La memoria que usa",
                "El usuario que lo inició"
            ],
            correcta: 1,
            explicacion: "El contexto incluye registros, contador de programa, estado de memoria, etc. Necesario para cambio de contexto correcto."
        },
        {
            pregunta: "¿Qué es cambio de contexto?",
            opciones: [
                "Cuando un proceso termina",
                "El proceso de guardar contexto de un proceso e iniciar otro",
                "Cuando un proceso usa memoria",
                "Cuando entra una E/S"
            ],
            correcta: 1,
            explicacion: "El cambio de contexto guarda el estado del proceso actual, restaura el del siguiente. Tiene overhead de CPU."
        },
        {
            pregunta: "¿Cuál es un campo típico en el PCB?",
            opciones: [
                "Dirección física de memoria RAM",
                "Identificador de proceso (PID)",
                "Velocidad de reloj del CPU",
                "Temperatura del procesador"
            ],
            correcta: 1,
            explicacion: "El PID es un campo esencial del PCB. Otros campos: estado, registros, contador de programa, información de E/S."
        }
    ],
    'quiz-tema4': [
        {
            pregunta: "¿Cuál es la principal diferencia entre un proceso y un hilo?",
            opciones: [
                "Los hilos son más lentos",
                "Los procesos comparten memoria, los hilos no",
                "Los hilos comparten memoria con otros hilos del proceso; los procesos tienen memoria aislada",
                "No hay diferencia significativa"
            ],
            correcta: 2,
            explicacion: "Hilos en el mismo proceso comparten código, datos, heap. Cada hilo tiene su propio stack y registros. Procesos no comparten nada."
        },
        {
            pregunta: "¿Qué modelo de hilos es 1:1?",
            opciones: [
                "Múltiples hilos de usuario en un hilo de kernel",
                "Cada hilo de usuario tiene un hilo de kernel correspondiente",
                "Muchos hilos de usuario en menos hilos de kernel",
                "Ninguno de los anteriores"
            ],
            correcta: 1,
            explicacion: "1:1 significa que cada hilo de usuario tiene su propio hilo de kernel. El SO ve todos los hilos."
        },
        {
            pregunta: "¿Cuál es una ventaja de los hilos sobre procesos?",
            opciones: [
                "Mayor aislamiento",
                "Creación más rápida y menor overhead",
                "Mejor seguridad",
                "Menos complejidad de sincronización"
            ],
            correcta: 1,
            explicacion: "Los hilos son mucho más rápidos de crear, cambio de contexto es rápido (no cambia MMU), menor overhead general."
        },
        {
            pregunta: "¿En el modelo M:1, qué ocurre si un hilo se bloquea?",
            opciones: [
                "Solo ese hilo se bloquea",
                "Se despierta otro hilo automáticamente",
                "Todos los hilos del proceso se bloquean",
                "El SO crea un nuevo hilo"
            ],
            correcta: 2,
            explicacion: "En M:1, si el único hilo de kernel se bloquea, todos los hilos de usuario se bloquean. Este es el principal problema de M:1."
        },
        {
            pregunta: "¿Qué es una condición de carrera?",
            opciones: [
                "Cuando dos procesos compiten por CPU",
                "Resultado impredecible cuando múltiples hilos acceden a datos compartidos sin sincronización",
                "Cuando un hilo es más rápido que otro",
                "Un error de compilador"
            ],
            correcta: 1,
            explicacion: "Las condiciones de carrera ocurren cuando múltiples hilos acceden/modifican datos compartidos sin protección."
        }
    ],
    'quiz-tema5': [
        {
            pregunta: "¿Qué es la exclusión mutua en sincronización?",
            opciones: [
                "Cuando dos procesos nunca se comunican",
                "Solo un proceso/hilo a la vez puede estar en una región crítica",
                "Cuando un proceso excluye a otro de usar CPU",
                "Un error en el SO"
            ],
            correcta: 1,
            explicacion: "La exclusión mutua es el principio de que solo un proceso debe acceder a un recurso crítico simultáneamente."
        },
        {
            pregunta: "¿Cuál es la operación P (wait) en un semáforo?",
            opciones: [
                "Incrementa el valor del semáforo",
                "Decrementa el valor; si es cero, bloquea el proceso",
                "Libera el recurso",
                "Crea un nuevo semáforo"
            ],
            correcta: 1,
            explicacion: "P (wait) decrementa el semáforo. Si cero, el proceso entra en cola de espera. Si > cero, continúa."
        },
        {
            pregunta: "¿Cuáles son las cuatro condiciones necesarias para deadlock?",
            opciones: [
                "Exclusión, Retención, No-Preemción, Espera Circular",
                "CPU, Memoria, E/S, Red",
                "FCFS, Priority, RR, SJF",
                "Leer, Escribir, Borrar, Actualizar"
            ],
            correcta: 0,
            explicacion: "Condiciones de Coffman: (1) Exclusión Mutua, (2) Retención de recursos, (3) No preemción, (4) Espera circular."
        },
        {
            pregunta: "¿Cuál es la diferencia entre deadlock y starvation?",
            opciones: [
                "Son lo mismo",
                "Deadlock: espera mutua. Starvation: nunca obtiene recurso",
                "Starvation es deadlock a nivel de usuario",
                "No hay diferencia significativa"
            ],
            correcta: 1,
            explicacion: "Deadlock: dos procesos se bloquean mutuamente. Starvation: un proceso listo pero nunca obtiene CPU."
        },
        {
            pregunta: "¿Qué es una variable de condición?",
            opciones: [
                "Una variable booleana en el programa",
                "Un mecanismo que permite un proceso esperar a un evento específico",
                "Una declaración if/else",
                "Un tipo de mutex"
            ],
            correcta: 1,
            explicacion: "Las variables de condición permiten que un proceso espere (wait) hasta que otro lo despierte (notify)."
        }
    ],
    'quiz-tema6': [
        {
            pregunta: "¿Cuál es la función principal de la planificación de procesos?",
            opciones: [
                "Compilar programas",
                "Decidir qué proceso ejecuta en cada momento del CPU",
                "Guardar datos en disco",
                "Mostrar la interfaz gráfica"
            ],
            correcta: 1,
            explicacion: "El planificador del SO decide el orden y duración de ejecución de procesos para optimizar rendimiento."
        },
        {
            pregunta: "¿Cuál es la diferencia entre procesos I/O-bound y CPU-bound?",
            opciones: [
                "Tamaño de memoria",
                "I/O-bound espera mucho en E/S; CPU-bound usa mucho CPU",
                "Prioridad del proceso",
                "Número de hilos"
            ],
            correcta: 1,
            explicacion: "I/O-bound: mucho tiempo bloqueado (E/S). CPU-bound: mucho tiempo ejecutando cálculos."
        },
        {
            pregunta: "¿Qué es el tiempo de turnaround?",
            opciones: [
                "Tiempo para cambiar de proceso",
                "Tiempo desde llegada hasta finalización del proceso",
                "Tiempo promedio de ejecución",
                "Tiempo de acceso a disco"
            ],
            correcta: 1,
            explicacion: "Turnaround = Tiempo de Finalización - Tiempo de Llegada. Incluye espera + ejecución."
        },
        {
            pregunta: "¿Cuál es una ventaja de la planificación preemtiva?",
            opciones: [
                "Menor overhead",
                "Mayor equidad entre procesos",
                "Procesos más largos terminan primero",
                "No requiere sincronización"
            ],
            correcta: 1,
            explicacion: "Preemtiva permite que el SO interrumpa procesos, distribuye mejor el CPU, es más justa."
        },
        {
            pregunta: "¿Qué métrica es más importante en un sistema interactivo?",
            opciones: [
                "Throughput",
                "Tiempo de Respuesta (baja latencia)",
                "Utilización de CPU",
                "Tiempo de Turnaround"
            ],
            correcta: 1,
            explicacion: "En sistemas interactivos, los usuarios valoran que las aplicaciones respondan rápidamente (baja latencia)."
        }
    ],
    'quiz-tema7': [
        {
            pregunta: "¿Cuál es el principal problema del algoritmo FCFS?",
            opciones: [
                "Es muy complejo",
                "Consume mucha CPU",
                "El efecto convoy: procesos cortos esperan procesos largos",
                "Usa mucha memoria"
            ],
            correcta: 2,
            explicacion: "En FCFS, si un proceso largo llega primero, todos los cortos deben esperar. Esto es el 'convoy effect'."
        },
        {
            pregunta: "¿Por qué SJF es óptimo pero impractico?",
            opciones: [
                "Usa mucha memoria",
                "Es muy lento",
                "Requiere conocer la duración de procesos por adelantado (imposible)",
                "Causa starvation"
            ],
            correcta: 2,
            explicacion: "SJF es matemáticamente óptimo si conoces duraciones. Pero en sistemas reales, no conoces duraciones de procesos."
        },
        {
            pregunta: "¿Cuál es la característica principal de Round Robin?",
            opciones: [
                "Ejecuta procesos por prioridad",
                "Cada proceso obtiene un quantum de tiempo, luego va al final de la cola",
                "Ejecuta primero el que menos tiempo usó",
                "Ejecuta primero el que llegó"
            ],
            correcta: 1,
            explicacion: "Round Robin es preemtivo, circular, y equitativo: todos obtienen igual tiempo (quantum) antes de ser interrumpidos."
        },
        {
            pregunta: "¿Cuál es una desventaja de Priority Scheduling?",
            opciones: [
                "Es muy simple",
                "No distingue procesos importantes",
                "Puede causar starvation: procesos bajos nunca corren",
                "No es preemtivo"
            ],
            correcta: 2,
            explicacion: "Si procesos altos siempre están listos, procesos bajos nunca obtienen CPU. Esto es starvation."
        },
        {
            pregunta: "¿Cómo funciona Feedback Multinivel?",
            opciones: [
                "Todos los procesos tienen igual prioridad",
                "Asigna prioridades fijas a cada proceso",
                "Procesos se mueven entre colas según comportamiento (cortos arriba, largos abajo)",
                "Usa solo FCFS"
            ],
            correcta: 2,
            explicacion: "Feedback detecta automáticamente: si un proceso usa poco CPU antes de E/S (interactivo), prioridad sube. Si usa mucho (batch), baja."
        }
    ]
};

// ========== GENERACIÓN DE QUIZZES ========== 
function generarQuizzes() {
    for (const [quizId, preguntas] of Object.entries(datosQuizzes)) {
        const contenedor = document.getElementById(quizId);
        if (!contenedor) continue;
        
        preguntas.forEach((pregunta, indice) => {
            const divPregunta = document.createElement('div');
            divPregunta.className = 'pregunta-quiz';
            divPregunta.setAttribute('data-pregunta', indice);
            
            let htmlOpciones = '';
            pregunta.opciones.forEach((opcion, indexOpcion) => {
                htmlOpciones += `
                    <label class="opcion-quiz">
                        <input type="radio" name="pregunta${indice}" value="${indexOpcion}" 
                               onchange="verificarRespuestaQuiz('${quizId}', ${indice}, ${indexOpcion})">
                        <span>${opcion}</span>
                    </label>
                `;
            });
            
            divPregunta.innerHTML = `
                <div class="pregunta-titulo">
                    Pregunta ${indice + 1}: ${pregunta.pregunta}
                </div>
                <div class="opciones-quiz">
                    ${htmlOpciones}
                </div>
                <div class="explicacion-quiz" id="explicacion-${quizId}-${indice}">
                    <p><strong>Explicación:</strong> ${pregunta.explicacion}</p>
                </div>
            `;
            
            contenedor.appendChild(divPregunta);
        });
        
        // Agregar botón de envío
        const btnEnviar = document.createElement('button');
        btnEnviar.className = 'btn btn-primary';
        btnEnviar.textContent = 'Enviar Respuestas';
        btnEnviar.onclick = function() {
            calcularPuntajeQuiz(quizId);
        };
        contenedor.appendChild(btnEnviar);
        
        // Agregar contenedor de resultado
        const divResultado = document.createElement('div');
        divResultado.className = 'resultado-quiz';
        divResultado.id = `resultado-${quizId}`;
        contenedor.appendChild(divResultado);
    }
}

// ========== VERIFICAR RESPUESTA EN TIEMPO REAL ========== 
function verificarRespuestaQuiz(quizId, numPregunta, opcionSeleccionada) {
    const preguntas = datosQuizzes[quizId];
    if (!preguntas || !preguntas[numPregunta]) return;
    
    const pregunta = preguntas[numPregunta];
    const divPregunta = document.querySelector(`[data-pregunta="${numPregunta}"]`);
    
    if (!divPregunta) return;
    
    // Mostrar explicación
    const explicacion = document.getElementById(`explicacion-${quizId}-${numPregunta}`);
    if (explicacion) {
        explicacion.classList.add('mostrar');
    }
    
    // Resaltar respuesta correcta e incorrecta
    const opciones = divPregunta.querySelectorAll('.opcion-quiz');
    opciones.forEach((opcion, index) => {
        opcion.classList.remove('correcta', 'incorrecta', 'seleccionada');
        
        const input = opcion.querySelector('input[type="radio"]');
        if (input && input.checked) {
            opcion.classList.add('seleccionada');
        }
        
        if (index === pregunta.correcta) {
            opcion.classList.add('correcta');
        } else if (input && input.checked) {
            opcion.classList.add('incorrecta');
        }
    });
    
    divPregunta.classList.add('respondida');
}

// ========== CALCULAR PUNTAJE DEL QUIZ ========== 
function calcularPuntajeQuiz(quizId) {
    const preguntas = datosQuizzes[quizId];
    if (!preguntas) return;
    
    let correctas = 0;
    let total = preguntas.length;
    
    preguntas.forEach((pregunta, indice) => {
        const radioSeleccionado = document.querySelector(
            `input[name="pregunta${indice}"]:checked`
        );
        
        if (radioSeleccionado) {
            const respuesta = parseInt(radioSeleccionado.value);
            if (respuesta === pregunta.correcta) {
                correctas++;
            }
        }
    });
    
    const puntaje = Math.round((correctas / total) * 100);
    
    mostrarResultadoQuiz(quizId, correctas, total, puntaje);
}

// ========== MOSTRAR RESULTADO DEL QUIZ ========== 
function mostrarResultadoQuiz(quizId, correctas, total, porcentaje) {
    const divResultado = document.getElementById(`resultado-${quizId}`);
    if (!divResultado) return;
    
    let mensaje = '';
    if (porcentaje >= 90) {
        mensaje = '¡Excelente! Has dominado este tema.';
    } else if (porcentaje >= 70) {
        mensaje = '¡Muy bien! Tienes una buena comprensión del tema.';
    } else if (porcentaje >= 50) {
        mensaje = 'Buen intento. Te recomendamos revisar los conceptos.';
    } else {
        mensaje = 'Necesitas repasar este tema. Vuelve a intentarlo después de estudiar.';
    }
    
    divResultado.innerHTML = `
        <div class="resultado-puntaje">${porcentaje}%</div>
        <div class="resultado-porcentaje">${mensaje}</div>
        <div class="resultado-detalles">
            <div class="detalle-item">
                <div class="detalle-numero">${correctas}</div>
                <div class="detalle-etiqueta">Correctas</div>
            </div>
            <div class="detalle-item">
                <div class="detalle-numero">${total - correctas}</div>
                <div class="detalle-etiqueta">Incorrectas</div>
            </div>
            <div class="detalle-item">
                <div class="detalle-numero">${total}</div>
                <div class="detalle-etiqueta">Total</div>
            </div>
        </div>
        <p>Revisa tus respuestas y las explicaciones para mejorar.</p>
    `;
    
    divResultado.classList.add('mostrar');
    
    // Scroll hasta el resultado
    divResultado.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ========== UTILIDADES DE SCROLL ========== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== MANEJO DE ELEMENTOS INTERACTIVOS ========== 
document.addEventListener('click', function(e) {
    // Cerrar menú lateral si se hace clic fuera
    if (appState.menuAbierto && 
        !e.target.closest('.menu-lateral') && 
        !e.target.closest('.menu-toggle')) {
        cerrarMenuLateral();
    }
});

// ========== FUNCIONES DE SIMULACIÓN ========== 

// Simulación de Deadlock (Tema 5)
function iniciarSimulacionDeadlock() {
    const contenedor = document.getElementById('simulacion-deadlock');
    if (!contenedor) return;
    
    let paso = 0;
    const pasos = [
        { titulo: 'Paso 1: Estado Inicial', 
          desc: 'Proceso A necesita Lock X e Y. Proceso B necesita Lock Y e X.',
          html: `
            <div style="display: flex; justify-content: space-around; margin: 20px 0;">
              <div style="text-align: center;">
                <div style="width: 80px; height: 80px; background: #E0E7FF; border: 2px solid #1E3A8A; border-radius: 8px; margin: auto 10px; display: flex; align-items: center; justify-content: center; font-weight: bold;">Proceso A</div>
                <p style="font-size: 11px; margin-top: 10px;">Necesita: X, Y</p>
              </div>
              <div style="text-align: center;">
                <div style="width: 80px; height: 80px; background: #E0E7FF; border: 2px solid #1E3A8A; border-radius: 8px; margin: auto 10px; display: flex; align-items: center; justify-content: center; font-weight: bold;">Proceso B</div>
                <p style="font-size: 11px; margin-top: 10px;">Necesita: Y, X</p>
              </div>
              <div style="text-align: center;">
                <div style="width: 60px; height: 60px; background: #FEF3C7; border: 2px solid #D97706; border-radius: 8px; margin: auto 10px; display: flex; align-items: center; justify-content: center; font-weight: bold;">Lock X</div>
                <p style="font-size: 11px; margin-top: 10px;">Libre</p>
              </div>
              <div style="text-align: center;">
                <div style="width: 60px; height: 60px; background: #FEF3C7; border: 2px solid #D97706; border-radius: 8px; margin: auto 10px; display: flex; align-items: center; justify-content: center; font-weight: bold;">Lock Y</div>
                <p style="font-size: 11px; margin-top: 10px;">Libre</p>
              </div>
            </div>
            <p style="text-align: center; color: #666; font-size: 12px; margin-top: 20px;">Ambos locks disponibles. Procesos pueden comenzar.</p>
          ` 
        },
        { titulo: 'Paso 2: A Adquiere X',
          desc: 'Proceso A adquiere Lock X exitosamente.',
          html: `
            <div style="display: flex; justify-content: space-around; margin: 20px 0;">
              <div style="text-align: center;">
                <div style="width: 80px; height: 80px; background: #D4F4DD; border: 2px solid #16A34A; border-radius: 8px; margin: auto 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #16A34A;">Proceso A</div>
                <p style="font-size: 11px; margin-top: 10px;">Tiene: X<br/>Espera: Y</p>
              </div>
              <div style="text-align: center;">
                <div style="width: 80px; height: 80px; background: #E0E7FF; border: 2px solid #1E3A8A; border-radius: 8px; margin: auto 10px; display: flex; align-items: center; justify-content: center; font-weight: bold;">Proceso B</div>
                <p style="font-size: 11px; margin-top: 10px;">Necesita: Y, X</p>
              </div>
              <div style="text-align: center;">
                <div style="width: 60px; height: 60px; background: #D4F4DD; border: 2px solid #16A34A; border-radius: 8px; margin: auto 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 10px;">Lock X (A)</div>
                <p style="font-size: 11px; margin-top: 10px;">Usado</p>
              </div>
              <div style="text-align: center;">
                <div style="width: 60px; height: 60px; background: #FEF3C7; border: 2px solid #D97706; border-radius: 8px; margin: auto 10px; display: flex; align-items: center; justify-content: center; font-weight: bold;">Lock Y</div>
                <p style="font-size: 11px; margin-top: 10px;">Libre</p>
              </div>
            </div>
            <p style="text-align: center; color: #666; font-size: 12px; margin-top: 20px;">✓ A adquirió X. Ahora intenta obtener Y.</p>
          `
        },
        { titulo: 'Paso 3: B Adquiere Y',
          desc: 'Proceso B adquiere Lock Y exitosamente.',
          html: `
            <div style="display: flex; justify-content: space-around; margin: 20px 0;">
              <div style="text-align: center;">
                <div style="width: 80px; height: 80px; background: #D4F4DD; border: 2px solid #16A34A; border-radius: 8px; margin: auto 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #16A34A;">Proceso A</div>
                <p style="font-size: 11px; margin-top: 10px;">Tiene: X<br/>Espera: Y ⏳</p>
              </div>
              <div style="text-align: center;">
                <div style="width: 80px; height: 80px; background: #D4F4DD; border: 2px solid #16A34A; border-radius: 8px; margin: auto 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #16A34A;">Proceso B</div>
                <p style="font-size: 11px; margin-top: 10px;">Tiene: Y<br/>Espera: X ⏳</p>
              </div>
              <div style="text-align: center;">
                <div style="width: 60px; height: 60px; background: #D4F4DD; border: 2px solid #16A34A; border-radius: 8px; margin: auto 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 10px;">Lock X (A)</div>
                <p style="font-size: 11px; margin-top: 10px;">Usado</p>
              </div>
              <div style="text-align: center;">
                <div style="width: 60px; height: 60px; background: #D4F4DD; border: 2px solid #16A34A; border-radius: 8px; margin: auto 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 10px;">Lock Y (B)</div>
                <p style="font-size: 11px; margin-top: 10px;">Usado</p>
              </div>
            </div>
            <p style="text-align: center; color: #F97316; font-size: 12px; margin-top: 20px; font-weight: bold;">⚠️ A espera Y, B espera X. ¡DEADLOCK!</p>
          `
        }
    ];
    
    let html = `<div style="padding: 20px;">`;
    html += `<h5 style="margin-bottom: 15px;">${pasos[paso].titulo}</h5>`;
    html += pasos[paso].html;
    html += `<div style="margin-top: 30px; text-align: center;">`;
    html += `<p style="color: #666; font-size: 12px; margin-bottom: 15px;">${pasos[paso].desc}</p>`;
    html += `<button class="btn btn-secondary" onclick="avanzarSimulacionDeadlock(this, ${pasos.length})">Siguiente Paso →</button>`;
    html += `</div></div>`;
    
    contenedor.innerHTML = html;
}

function avanzarSimulacionDeadlock(boton, totalPasos) {
    const pasos = [
        { titulo: 'Paso 1: Estado Inicial', desc: 'Proceso A necesita Lock X e Y. Proceso B necesita Lock Y e X.' },
        { titulo: 'Paso 2: A Adquiere X', desc: 'Proceso A adquiere Lock X exitosamente.' },
        { titulo: 'Paso 3: B Adquiere Y', desc: 'Proceso B adquiere Lock Y exitosamente.' }
    ];
    
    const contenedor = document.getElementById('simulacion-deadlock');
    let paso = parseInt(boton.getAttribute('data-paso') || 0) + 1;
    
    if (paso >= pasos.length) {
        contenedor.innerHTML = `
            <div style="padding: 20px; text-align: center;">
                <h5 style="color: #F97316; margin-bottom: 15px;">🔒 DEADLOCK DETECTADO 🔒</h5>
                <p style="font-size: 13px; margin-bottom: 20px;">
                    El sistema está congelado. Ambos procesos esperan mutuamente por locks que nunca serán liberados.
                </p>
                <div style="background: #FEF2F2; border: 1px solid #DC2626; border-radius: 8px; padding: 15px; margin: 20px 0; font-size: 12px;">
                    <p><strong>¿Cómo se previene?</strong></p>
                    <ul style="text-align: left; margin-top: 10px;">
                        <li>Orden de adquisición: ambos procesos adquieren locks en el mismo orden</li>
                        <li>Timeouts: si un lock tarda demasiado, libera todo e intenta de nuevo</li>
                        <li>Detección: el SO detecta ciclos y termina uno de los procesos</li>
                        <li>Evasión: el SO verifica antes de dar un recurso si causaría deadlock</li>
                    </ul>
                </div>
                <button class="btn btn-secondary" onclick="iniciarSimulacionDeadlock()">Reiniciar Simulación</button>
            </div>
        `;
        return;
    }
    
    iniciarSimulacionDeadlock();
}

// Simulador de Algoritmos de Planificación (Tema 7)
function abrirSimuladorAlgoritmos() {
    alert('Simulador de Algoritmos: Esta herramienta interactiva te permite:\n\n1. Ingresar procesos con tiempos de CPU\n2. Seleccionar algoritmo (FCFS, SJF, RR)\n3. Ver diagrama Gantt\n4. Calcular métricas (espera, turnaround)\n\nPróximamente disponible en la Parte 3 completa.');
}

// ========== SIMULACRO PARCIAL (30 PREGUNTAS) ========== 
const simulacroParcial = [
    // Tema 1 (4 preguntas)
    {
        pregunta: "¿Cuál es el objetivo principal de un sistema operativo?",
        opciones: [
            "Ejecutar programas sin protección",
            "Administrar recursos de hardware y proporcionar una interfaz al usuario",
            "Compilar código fuente",
            "Eliminar archivos del disco"
        ],
        correcta: 1,
        explicacion: "El SO administra recursos (CPU, memoria, E/S) y proporciona una interfaz (shell, GUI) para que usuarios interactúen."
    },
    {
        pregunta: "¿Cuál es una característica de un SO multiprocesador?",
        opciones: [
            "Solo un procesador puede ejecutar instrucciones",
            "Múltiples procesadores comparten memoria y trabajan simultáneamente",
            "Los procesadores no se comunican entre sí",
            "Es más lento que un SO monoprocesador"
        ],
        correcta: 1,
        explicacion: "En multiprocesadores, múltiples CPUs comparten la misma memoria y pueden paralelizar tareas."
    },
    {
        pregunta: "¿Qué es un proceso?",
        opciones: [
            "Un archivo ejecutable en el disco",
            "Una instancia de un programa en ejecución con su contexto",
            "Un archivo de configuración del SO",
            "Una instrucción individual del CPU"
        ],
        correcta: 1,
        explicacion: "Un proceso = programa + contexto (memoria, registros, estado). Es la unidad de ejecución del SO."
    },
    {
        pregunta: "¿Cuál es la función principal del PCB (Bloque de Control de Proceso)?",
        opciones: [
            "Ejecutar el programa del usuario",
            "Almacenar información necesaria para administrar un proceso",
            "Compilar código fuente",
            "Enviar datos a la impresora"
        ],
        correcta: 1,
        explicacion: "El PCB contiene: PID, estado, registros, contador de programa, memoria, información de E/S."
    },
    
    // Tema 2 (4 preguntas)
    {
        pregunta: "¿Cuál es la principal diferencia entre UMA y NUMA?",
        opciones: [
            "UMA es más rápido pero NUMA es más escalable",
            "UMA tiene latencia uniforme; NUMA tiene latencia variable según ubicación",
            "NUMA no tiene memoria compartida",
            "UMA solo funciona en Linux"
        ],
        correcta: 1,
        explicacion: "UMA (Uniform): todos los CPUs ven la misma latencia. NUMA (Non-Uniform): latencia local rápida, remota lenta."
    },
    {
        pregunta: "¿Cuál es una ventaja de los sistemas distribuidos sobre los multiprocesadores?",
        opciones: [
            "Menor costo de comunicación entre máquinas",
            "Mayor tolerancia a fallos y escalabilidad",
            "Menor complejidad de software",
            "Mejor rendimiento en aplicaciones simples"
        ],
        correcta: 1,
        explicacion: "Distribuidos escalan agregando máquinas y toleran fallos. Multiprocesadores tienen límite físico."
    },
    {
        pregunta: "¿Qué es MPP (Massively Parallel Processor)?",
        opciones: [
            "Un tipo de memoria RAM",
            "Una arquitectura con cientos de procesadores con memoria local",
            "Un algoritmo de planificación",
            "Un tipo de cableado de red"
        ],
        correcta: 1,
        explicacion: "MPP = arquitectura altamente paralela con muchos procesadores, cada uno con su memoria local."
    },
    {
        pregunta: "¿Cuál es una desventaja de los sistemas distribuidos?",
        opciones: [
            "No pueden paralelizar trabajo",
            "Latencia de comunicación de red puede ser alta",
            "Usan menos energía que multiprocesadores",
            "No soportan múltiples usuarios"
        ],
        correcta: 1,
        explicacion: "La latencia de red (ms) es mucho mayor que latencia de memoria (ns), afectando rendimiento."
    },

    // Tema 3 (4 preguntas)
    {
        pregunta: "¿Cuáles son los estados principales de un proceso?",
        opciones: [
            "Activo, Inactivo, Pausado",
            "Nuevo, Listo, Ejecutando, Bloqueado, Terminado",
            "Abierto, Cerrado, Suspendido",
            "Iniciando, Corriendo, Esperando"
        ],
        correcta: 1,
        explicacion: "Estados: Nuevo (creado), Listo (espera CPU), Ejecutando (en CPU), Bloqueado (E/S), Terminado."
    },
    {
        pregunta: "¿Cuándo transiciona un proceso del estado Ejecutando a Bloqueado?",
        opciones: [
            "Cuando termina la ejecución",
            "Cuando solicita E/S o espera un evento",
            "Cuando el SO lo decide arbitrariamente",
            "Cuando se abre un archivo"
        ],
        correcta: 1,
        explicacion: "Transiciona a Bloqueado cuando ejecuta operación de E/S bloqueante (lectura disco, etc)."
    },
    {
        pregunta: "¿Qué información almacena el PCB de un proceso?",
        opciones: [
            "Solo el código del programa",
            "Solo la memoria usada",
            "PID, estado, registros, contador de programa, memoria, información de E/S",
            "Solo los archivos abiertos"
        ],
        correcta: 2,
        explicacion: "El PCB contiene toda la información necesaria para administrar y reanudar un proceso."
    },
    {
        pregunta: "¿Qué es cambio de contexto?",
        opciones: [
            "Cambiar de variable en el programa",
            "Guardar el contexto de un proceso y cargar el de otro",
            "Cambiar el sistema operativo",
            "Cambiar la prioridad de un proceso"
        ],
        correcta: 1,
        explicacion: "Cambio de contexto: guardar registros, PC, estado del proceso actual; restaurar del siguiente."
    },

    // Tema 4 (4 preguntas)
    {
        pregunta: "¿Cuál es la principal ventaja de los hilos sobre procesos?",
        opciones: [
            "Mejor aislamiento de errores",
            "Creación más rápida y menor overhead",
            "Mayor seguridad",
            "Mejor compatibilidad"
        ],
        correcta: 1,
        explicacion: "Hilos: creación rápida (microsegundos), cambio de contexto rápido (no cambia MMU)."
    },
    {
        pregunta: "¿Qué modelo de hilos es 1:1?",
        opciones: [
            "Múltiples hilos de usuario en un hilo de kernel",
            "Cada hilo de usuario tiene un hilo de kernel correspondiente",
            "Un hilo solo puede ejecutar en un CPU",
            "Todos los hilos comparten la misma memoria"
        ],
        correcta: 1,
        explicacion: "Modelo 1:1: cada hilo de usuario = un hilo de kernel. Permite verdadero paralelismo."
    },
    {
        pregunta: "¿Cuál es una desventaja de usar hilos en lugar de procesos?",
        opciones: [
            "Mayor consumo de memoria",
            "Menos rendimiento",
            "Complejidad de sincronización y riesgo de condiciones de carrera",
            "Imposible de depurar"
        ],
        correcta: 2,
        explicacion: "Hilos comparten memoria, causando complejidad en sincronización y riesgo de bugs."
    },
    {
        pregunta: "¿En qué modelo de hilos, si uno se bloquea, todos se bloquean?",
        opciones: [
            "Modelo 1:1",
            "Modelo M:N",
            "Modelo M:1 (muchos-a-uno)",
            "Ninguno, siempre hay uno activo"
        ],
        correcta: 2,
        explicacion: "M:1: múltiples hilos de usuario en un hilo kernel. Si se bloquea, todos se bloquean."
    },

    // Tema 5 (5 preguntas)
    {
        pregunta: "¿Qué es exclusión mutua?",
        opciones: [
            "Cuando procesos nunca se comunican",
            "Solo un proceso/hilo a la vez puede estar en una región crítica",
            "Cuando dos procesos tienen igual prioridad",
            "Un error del compilador"
        ],
        correcta: 1,
        explicacion: "Exclusión mutua: asegura que solo un proceso acceda al recurso crítico simultáneamente."
    },
    {
        pregunta: "¿Cuál es la operación P (wait) en un semáforo?",
        opciones: [
            "Incrementa el semáforo",
            "Decrementa el semáforo; si es 0, bloquea el proceso",
            "Libera el recurso",
            "Crea un nuevo semáforo"
        ],
        correcta: 1,
        explicacion: "P (wait): decrementa; si llega a 0, el proceso se bloquea hasta que otro ejecute V."
    },
    {
        pregunta: "¿Cuáles son las cuatro condiciones necesarias para que ocurra un deadlock?",
        opciones: [
            "CPU, Memoria, Disco, Red",
            "Proceso A, Proceso B, Recurso, Tiempo",
            "Exclusión, Retención, No-Preemción, Espera Circular",
            "Lectura, Escritura, Borrado, Actualización"
        ],
        correcta: 2,
        explicacion: "Condiciones de Coffman: se deben cumplir las 4 para que ocurra deadlock."
    },
    {
        pregunta: "¿Cuál es la diferencia entre deadlock y starvation?",
        opciones: [
            "Son lo mismo",
            "Deadlock: espera mutua indefinida. Starvation: nunca obtiene CPU",
            "Starvation es más grave que deadlock",
            "Deadlock solo ocurre en sistemas distribuidos"
        ],
        correcta: 1,
        explicacion: "Deadlock: dos procesos se bloquean mutuamente. Starvation: proceso listo nunca obtiene CPU."
    },
    {
        pregunta: "¿Qué es una región crítica?",
        opciones: [
            "Una sección que tarda mucho en ejecutar",
            "Código donde se accede a recursos compartidos y que requiere sincronización",
            "Una sección que causa error",
            "La región más importante del programa"
        ],
        correcta: 1,
        explicacion: "Región crítica: código que accede a datos compartidos. Debe protegerse de acceso concurrente."
    },

    // Tema 6 (3 preguntas)
    {
        pregunta: "¿Cuál es la función principal del planificador del SO?",
        opciones: [
            "Compilar programas",
            "Decidir qué proceso ejecuta en cada momento del CPU",
            "Guardar datos en disco",
            "Mostrar la interfaz gráfica"
        ],
        correcta: 1,
        explicacion: "El planificador selecciona qué proceso de la cola de listos obtiene la CPU."
    },
    {
        pregunta: "¿Cuál es la diferencia entre procesos I/O-bound y CPU-bound?",
        opciones: [
            "Tamaño de memoria",
            "I/O-bound espera mucho en E/S; CPU-bound usa mucho CPU",
            "Prioridad del proceso",
            "El compilador que se usa"
        ],
        correcta: 1,
        explicacion: "I/O-bound: entrada/salida frecuente (editor). CPU-bound: cálculos intensivos (renderizado)."
    },
    {
        pregunta: "¿Qué es el tiempo de turnaround de un proceso?",
        opciones: [
            "Tiempo para cambiar de proceso",
            "Tiempo desde llegada hasta finalización",
            "Tiempo promedio en la cola",
            "Tiempo entre dos interrupciones"
        ],
        correcta: 1,
        explicacion: "Turnaround = Tiempo finalización - Tiempo llegada. Incluye espera + ejecución."
    },

    // Tema 7 (6 preguntas)
    {
        pregunta: "¿Cuál es el principal problema del algoritmo FCFS?",
        opciones: [
            "Es muy complejo de implementar",
            "El efecto convoy: procesos cortos esperan procesos largos",
            "Causa starvation en todos los procesos",
            "Usa mucha memoria"
        ],
        correcta: 1,
        explicacion: "FCFS: si un proceso largo llega primero, todos los cortos deben esperar."
    },
    {
        pregunta: "¿Por qué SJF es óptimo pero impractico?",
        opciones: [
            "Usa mucha CPU",
            "Es muy lento",
            "Requiere conocer la duración por adelantado (imposible en real)",
            "Causa picos de consumo de memoria"
        ],
        correcta: 2,
        explicacion: "SJF es matemáticamente óptimo pero imposible en sistemas reales: no conoces duraciones."
    },
    {
        pregunta: "¿Cuál es la característica principal de Round Robin?",
        opciones: [
            "Ejecuta procesos por prioridad",
            "Cada proceso obtiene un quantum de tiempo, luego va al final de la cola",
            "Ejecuta primero el que menos tiempo usó",
            "Ejecuta solo procesos importantes"
        ],
        correcta: 1,
        explicacion: "RR: preemtivo, circular, equitativo. Todos obtienen igual tiempo (quantum)."
    },
    {
        pregunta: "¿Cuál es una desventaja de Priority Scheduling?",
        opciones: [
            "Es muy simple",
            "No distingue procesos importantes",
            "Puede causar starvation: procesos bajos nunca corren",
            "No es flexible"
        ],
        correcta: 2,
        explicacion: "Si procesos altos siempre están listos, los bajos nunca obtienen CPU (starvation)."
    },
    {
        pregunta: "¿Cómo funciona Feedback Multinivel?",
        opciones: [
            "Todos los procesos tienen igual prioridad",
            "Procesos se mueven entre colas según comportamiento (cortos arriba, largos abajo)",
            "Usa solo FCFS",
            "Los procesos nunca cambian de prioridad"
        ],
        correcta: 1,
        explicacion: "Feedback: detecta automáticamente si proceso es interactivo (arriba) o batch (abajo)."
    }
];

// ========== FUNCIÓN SIMULACRO =========== 
function iniciarSimulacro() {
    const contenedor = document.getElementById('simulacro-contenido');
    let respuestas = {};
    let puntajeActual = 0;
    
    // Renderizar todas las preguntas
    let html = '<div style="background: #F9FAFB; padding: 20px; border-radius: 8px;">';
    html += '<p style="color: #666; font-size: 12px; margin-bottom: 20px;">Total de preguntas: 30 | Requisito: 21/30 correctas (70 puntos)</p>';
    
    simulacroParcial.forEach((q, idx) => {
        html += `
            <div class="pregunta-simulacro" style="background: white; padding: 20px; margin-bottom: 15px; border-radius: 8px; border-left: 4px solid #3B82F6;">
                <h4 style="margin-top: 0;">Pregunta ${idx + 1} de 30</h4>
                <p style="font-weight: 500; margin: 10px 0;">${q.pregunta}</p>
                <div style="margin: 15px 0;">
        `;
        
        q.opciones.forEach((opcion, optIdx) => {
            html += `
                <label style="display: block; margin-bottom: 8px; padding: 8px; cursor: pointer; border-radius: 4px; hover-background: #F3F4F6;">
                    <input type="radio" name="pregunta-${idx}" value="${optIdx}" onchange="document.getElementById('respuesta-${idx}').value = '${optIdx}'" style="margin-right: 8px;" />
                    ${opcion}
                </label>
            `;
        });
        
        html += `
                </div>
                <input type="hidden" id="respuesta-${idx}" value="-1" />
            </div>
        `;
    });
    
    html += `
        <div style="text-align: center; margin-top: 30px;">
            <button class="btn btn-primary" onclick="calificarSimulacro()">📊 Calcular Resultado</button>
        </div>
    </div>
    `;
    
    contenedor.innerHTML = html;
}

function calificarSimulacro() {
    let puntaje = 0;
    let respuestasUsuario = [];
    
    simulacroParcial.forEach((q, idx) => {
        let respuesta = document.getElementById(`respuesta-${idx}`).value;
        respuestasUsuario.push(parseInt(respuesta));
        
        if (parseInt(respuesta) === q.correcta) {
            puntaje += 3.33; // 100 puntos / 30 preguntas
        }
    });
    
    puntaje = Math.round(puntaje * 100) / 100;
    const aprobado = puntaje >= 70;
    
    mostrarResultadoSimulacro(puntaje, aprobado, respuestasUsuario);
}

function mostrarResultadoSimulacro(puntaje, aprobado, respuestas) {
    const contenedor = document.getElementById('simulacro-contenido');
    
    let html = `
        <div style="background: ${aprobado ? '#D4EDDA' : '#F8D7DA'}; border: 2px solid ${aprobado ? '#28A745' : '#DC3545'}; border-radius: 8px; padding: 30px; text-align: center;">
            <h3 style="color: ${aprobado ? '#155724' : '#721C24'}; margin: 0;">
                ${aprobado ? '✅ ¡APROBADO!' : '❌ NO APROBADO'}
            </h3>
            <h2 style="font-size: 48px; color: ${aprobado ? '#155724' : '#721C24'}; margin: 10px 0;">${puntaje.toFixed(2)} / 100</h2>
            <p style="color: ${aprobado ? '#155724' : '#721C24'}; margin: 10px 0;">
                ${aprobado ? 'Excelente. Estás listo para el examen.' : 'Necesitas estudiar más. Revisa los temas.'}
            </p>
            <p style="color: ${aprobado ? '#155724' : '#721C24'}; font-size: 12px;">
                Requisito mínimo: 70 puntos (21/30 correctas)
            </p>
        </div>
    `;
    
    contenedor.innerHTML = html;
    
    // Scroll to results
    contenedor.scrollIntoView({ behavior: 'smooth' });
}

// ========== SIMULADOR DE ALGORITMOS DE PLANIFICACIÓN ==========

let procesosSimulador = [];

function agregarProcesoSimulador() {
    const nombre = document.getElementById('nombre-proceso').value;
    const duracion = parseInt(document.getElementById('duracion-proceso').value);
    const llegada = parseInt(document.getElementById('llegada-proceso').value);
    
    if (!nombre || !duracion) {
        alert('Completa todos los campos (mínimo nombre y duración)');
        return;
    }
    
    procesosSimulador.push({
        nombre: nombre,
        duracion: duracion,
        llegada: llegada || 0,
        original_duracion: duracion
    });
    
    mostrarTablaProcesos();
    
    // Limpiar inputs
    document.getElementById('nombre-proceso').value = '';
    document.getElementById('duracion-proceso').value = '';
    document.getElementById('llegada-proceso').value = '';
}

function limpiarProcesos() {
    procesosSimulador = [];
    document.getElementById('tabla-procesos').style.display = 'none';
    document.getElementById('procesos-vacio').style.display = 'block';
    document.getElementById('resultados-simulador').innerHTML = '<p style="color: #999; font-size: 12px;">Ejecuta una simulación para ver los resultados aquí</p>';
}

function mostrarTablaProcesos() {
    if (procesosSimulador.length === 0) {
        document.getElementById('tabla-procesos').style.display = 'none';
        document.getElementById('procesos-vacio').style.display = 'block';
        return;
    }
    
    const tabla = document.getElementById('tabla-procesos');
    tabla.style.display = 'table';
    document.getElementById('procesos-vacio').style.display = 'none';
    
    let html = '<tr><th>Proceso</th><th>CPU (ms)</th><th>Llegada (ms)</th><th>Acción</th></tr>';
    procesosSimulador.forEach((p, i) => {
        html += `<tr>
            <td>${p.nombre}</td>
            <td>${p.original_duracion}</td>
            <td>${p.llegada}</td>
            <td><button onclick="eliminarProceso(${i})" style="background: #DC2626; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Eliminar</button></td>
        </tr>`;
    });
    tabla.innerHTML = html;
}

function eliminarProceso(index) {
    procesosSimulador.splice(index, 1);
    mostrarTablaProcesos();
}

function ejecutarSimulador() {
    if (procesosSimulador.length === 0) {
        alert('Agrega al menos un proceso');
        return;
    }
    
    // Detectar selección de algoritmo
    const algoritmoSeleccionado = document.querySelector('input[name="algoritmo"]:checked').value;
    let quantum = 5;
    
    if (algoritmoSeleccionado === 'rr') {
        quantum = parseInt(document.getElementById('quantum-rr').value) || 5;
    }
    
    let resultado = {};
    
    switch(algoritmoSeleccionado) {
        case 'fcfs':
            resultado = simularFCFS();
            break;
        case 'sjf':
            resultado = simularSJF();
            break;
        case 'rr':
            resultado = simularRoundRobin(quantum);
            break;
    }
    
    mostrarResultadosSimulador(resultado, algoritmoSeleccionado);
}

function simularFCFS() {
    const procesos = [...procesosSimulador].sort((a, b) => a.llegada - b.llegada);
    let tiempo = 0;
    let resultados = [];
    
    procesos.forEach(p => {
        const inicio = Math.max(tiempo, p.llegada);
        const fin = inicio + p.duracion;
        resultados.push({
            nombre: p.nombre,
            inicio: inicio,
            fin: fin,
            turnaround: fin - p.llegada,
            espera: inicio - p.llegada
        });
        tiempo = fin;
    });
    
    return {
        algoritmo: 'FCFS',
        procesos: resultados,
        turnaroundPromedio: resultados.reduce((s, p) => s + p.turnaround, 0) / resultados.length,
        esperaPromedio: resultados.reduce((s, p) => s + p.espera, 0) / resultados.length
    };
}

function simularSJF() {
    const procesos = [...procesosSimulador];
    let tiempo = 0;
    let resultados = [];
    let procesosRestantes = [...procesos];
    
    while (procesosRestantes.length > 0) {
        // Procesos que ya han llegado
        const disponibles = procesosRestantes.filter(p => p.llegada <= tiempo);
        
        if (disponibles.length === 0) {
            // Adelantar tiempo al siguiente proceso
            const siguiente = procesosRestantes.reduce((min, p) => p.llegada < min.llegada ? p : min);
            tiempo = siguiente.llegada;
            continue;
        }
        
        // Seleccionar el más corto
        const seleccionado = disponibles.reduce((min, p) => p.duracion < min.duracion ? p : min);
        
        const inicio = tiempo;
        const fin = inicio + seleccionado.duracion;
        resultados.push({
            nombre: seleccionado.nombre,
            inicio: inicio,
            fin: fin,
            turnaround: fin - seleccionado.llegada,
            espera: inicio - seleccionado.llegada
        });
        
        tiempo = fin;
        procesosRestantes = procesosRestantes.filter(p => p.nombre !== seleccionado.nombre);
    }
    
    return {
        algoritmo: 'SJF (Shortest Job First)',
        procesos: resultados,
        turnaroundPromedio: resultados.reduce((s, p) => s + p.turnaround, 0) / resultados.length,
        esperaPromedio: resultados.reduce((s, p) => s + p.espera, 0) / resultados.length
    };
}

function simularRoundRobin(quantum) {
    const procesos = [...procesosSimulador];
    let tiempo = 0;
    let cola = [];
    let resultados = [];
    let procesosRestantes = [...procesos];
    
    // Ordenar por llegada
    procesosRestantes.sort((a, b) => a.llegada - b.llegada);
    let indiceProxLlegada = 0;
    
    while (procesosRestantes.length > 0 || cola.length > 0) {
        // Agregar procesos que llegan
        while (indiceProxLlegada < procesosRestantes.length && 
               procesosRestantes[indiceProxLlegada].llegada <= tiempo) {
            cola.push({...procesosRestantes[indiceProxLlegada]});
            indiceProxLlegada++;
        }
        
        if (cola.length === 0) {
            tiempo = procesosRestantes[indiceProxLlegada].llegada;
            continue;
        }
        
        const proceso = cola.shift();
        const inicio = tiempo;
        const tiempoEjecucion = Math.min(quantum, proceso.duracion);
        tiempo += tiempoEjecucion;
        proceso.duracion -= tiempoEjecucion;
        
        // Agregar nuevos procesos que llegan durante esta ejecución
        while (indiceProxLlegada < procesosRestantes.length && 
               procesosRestantes[indiceProxLlegada].llegada <= tiempo) {
            cola.push({...procesosRestantes[indiceProxLlegada]});
            indiceProxLlegada++;
        }
        
        if (proceso.duracion > 0) {
            cola.push(proceso);
        } else {
            resultados.push({
                nombre: proceso.nombre,
                inicio: inicio,
                fin: tiempo,
                turnaround: tiempo - proceso.llegada,
                espera: (tiempo - tiempoEjecucion) - proceso.llegada
            });
        }
    }
    
    return {
        algoritmo: `Round Robin (quantum = ${quantum}ms)`,
        procesos: resultados,
        turnaroundPromedio: resultados.reduce((s, p) => s + p.turnaround, 0) / resultados.length,
        esperaPromedio: resultados.reduce((s, p) => s + p.espera, 0) / resultados.length
    };
}

function mostrarResultadosSimulador(resultado, tipoAlgoritmo) {
    const contenedor = document.getElementById('resultados-simulador');
    
    let html = `<h4>${resultado.algoritmo}</h4>`;
    html += `<div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">`;
    
    // Tabla de resultados
    html += `<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="background: #3B82F6; color: white;">
            <th style="padding: 10px; text-align: left; border: 1px solid #E5E7EB;">Proceso</th>
            <th style="padding: 10px; text-align: center; border: 1px solid #E5E7EB;">Inicio</th>
            <th style="padding: 10px; text-align: center; border: 1px solid #E5E7EB;">Fin</th>
            <th style="padding: 10px; text-align: center; border: 1px solid #E5E7EB;">Turnaround</th>
            <th style="padding: 10px; text-align: center; border: 1px solid #E5E7EB;">Espera</th>
        </tr>`;
    
    resultado.procesos.forEach(p => {
        html += `<tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 10px; font-weight: 600;">${p.nombre}</td>
            <td style="padding: 10px; text-align: center;">${p.inicio}ms</td>
            <td style="padding: 10px; text-align: center;">${p.fin}ms</td>
            <td style="padding: 10px; text-align: center;">${p.turnaround}ms</td>
            <td style="padding: 10px; text-align: center;">${p.espera}ms</td>
        </tr>`;
    });
    
    html += `</table>`;
    
    // Métricas finales
    html += `<div style="background: #F0F9FF; padding: 15px; border-radius: 8px; border-left: 4px solid #0284C7;">
        <p><strong>Tiempo de Turnaround Promedio:</strong> ${resultado.turnaroundPromedio.toFixed(2)}ms</p>
        <p><strong>Tiempo de Espera Promedio:</strong> ${resultado.esperaPromedio.toFixed(2)}ms</p>
        <p><strong>Tiempo Total (Makespan):</strong> ${Math.max(...resultado.procesos.map(p => p.fin))}ms</p>
    </div>`;
    
    html += `</div>`;
    
    contenedor.innerHTML = html;
}

// Manejar cambio de algoritmo
document.addEventListener('DOMContentLoaded', function() {
    const algoritmos = document.querySelectorAll('input[name="algoritmo"]');
    algoritmos.forEach(algo => {
        algo.addEventListener('change', function() {
            const opcionesRR = document.getElementById('opciones-rr');
            if (this.value === 'rr') {
                opcionesRR.style.display = 'block';
            } else {
                opcionesRR.style.display = 'none';
            }
        });
    });
});

console.log('ERA 1 Parte 3 - Simulacro, Simulador de Algoritmos y recursos adicionales cargados.');
