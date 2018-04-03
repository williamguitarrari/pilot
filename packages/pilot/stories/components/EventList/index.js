import React from 'react'
import {
  Card,
  CardTitle,
} from 'former-kit'

import Section from '../../Section'
import Event from '../../../src/components/Event'

const EventList = () => (
  <Section>
    <Card>
      <CardTitle title="Histórico de transações" />
      <div>
        <Event
          number={5}
          title="Chargeback"
          color="#f27119"
          active
        >
          <section>
            Conciliação <br />
            16/10/17 às 16h01
          </section>
          <section>
            <strong>Total</strong><br />
            <p>R$ 40,00</p>

            <strong>Desconto MDR</strong><br />
            <p>- R$ 6,00</p>
          </section>

          <section>
            <strong>Responsável</strong><br />
            <p>Loja do João</p>
            <p>R$ 10,00</p>

            <span>Loja do Pedro</span><br />
            <p>R$ 10,00</p>
          </section>
        </Event>

        <Event
          number={4}
          title="Capturada"
          color="#53be76"
          collapsed
        >
          <section>
            Captura <br />
            16/10/17 às 21h12
          </section>

          <section>
            <strong>Total</strong><br />
            <p>R$ 40,00</p>

            <strong>Desconto MDR</strong><br />
            <p>- R$ 6,00</p>
          </section>

          <section>
            <strong>Responsável</strong><br />
            <p>Loja do João</p>
            <p>R$ 10,00</p>

            <span>Loja do Pedro</span><br />
            <p>R$ 10,00</p>
          </section>
        </Event>

        <Event
          number={3}
          title="Aprovada"
          color="#53be76"
          collapsed
        >
          <section>
            Regras de aprovação<br />
            01/02/2018 às 21h12
          </section>

          <section>
            <strong>Total</strong><br />
            <p>R$ 40,00</p>

            <strong>Desconto MDR</strong><br />
            <p>- R$ 6,00</p>
          </section>

          <section>
            <strong>Responsável</strong><br />
            <p>Loja do João</p>
            <p>R$ 10,00</p>

            <span>Loja do Pedro</span><br />
            <p>R$ 10,00</p>
          </section>
        </Event>

        <Event
          number={2}
          title="Análise de Antifraude"
          color="#53be76"
          collapsed
        >
          <section>
            Aprovada<br />
            01/02/2018 às 21h12
          </section>

          <section>
            <strong>Total</strong><br />
            <p>R$ 40,00</p>

            <strong>Desconto MDR</strong><br />
            <p>- R$ 6,00</p>
          </section>

          <section>
            <strong>Responsável</strong><br />
            <p>Loja do João</p>
            <p>R$ 10,00</p>

            <span>Loja do Pedro</span><br />
            <p>R$ 10,00</p>
          </section>
        </Event>

        <Event
          number={1}
          title="Autorizada"
          color="#fcb20a"
          collapsed
        >
          <section>
            Aprovada<br />
            01/02/2018 às 21h12
          </section>

          <section>
            <strong>Total</strong><br />
            <p>R$ 40,00</p>

            <strong>Desconto MDR</strong><br />
            <p>- R$ 6,00</p>
          </section>

          <section>
            <strong>Responsável</strong><br />
            <p>Loja do João</p>
            <p>R$ 10,00</p>

            <span>Loja do Pedro</span><br />
            <p>R$ 10,00</p>
          </section>
        </Event>
      </div>
    </Card>
  </Section>
)

export default EventList
