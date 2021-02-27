/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Person.
 */
@Entity('person')
export class Person extends BaseEntity {
  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'surname', nullable: true })
  surname: string;

  @Column({ name: 'birthdate', nullable: true })
  birthdate: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ name: 'district', nullable: true })
  district: string;

  @Column({ name: 'neighborhood', nullable: true })
  neighborhood: string;

  @Column({ name: 'stratus', nullable: true })
  stratus: string;

  @Column({ name: 'address', nullable: true })
  address: string;

  @Column({ name: 'rh', nullable: true })
  rh: string;

  @Column({ type: 'boolean', name: 'disease', nullable: true })
  disease: boolean;

  @Column({ type: 'boolean', name: 'disability', nullable: true })
  disability: boolean;

  @Column({ name: 'relations', nullable: true })
  relations: string;

  @Column({ name: 'state_civil', nullable: true })
  stateCivil: string;

  @Column({ name: 'profession', nullable: true })
  profession: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
