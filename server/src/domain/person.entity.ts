/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable, ObjectID, ObjectIdColumn } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Enrollment } from './enrollment.entity';
import { Course } from './course.entity';
import { Type } from './type.entity';
import { State } from './enumeration/state';

/**
 * A Person.
 */
@Entity('person')
export class Person extends BaseEntity {
  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'surname', nullable: true })
  surname: string;

  @Column({ name: 'document_id', nullable: true })
  documentId: string;

  @Column({ type: 'date', name: 'document_exp_date', nullable: true })
  documentExpDate: any;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ name: 'telephon_number', nullable: true })
  telephonNumber: string;

  @Column({ type: 'date', name: 'birthdate', nullable: true })
  birthdate: any;

  @Column({ name: 'address', nullable: true })
  address: string;

  @Column({ name: 'district', nullable: true })
  district: string;

  @Column({ name: 'stratus', nullable: true })
  stratus: string;

  @Column({ type: 'boolean', name: 'disease', nullable: true })
  disease: boolean;

  @Column({ type: 'boolean', name: 'disability', nullable: true })
  disability: boolean;

  @Column({ name: 'state_civil', nullable: true })
  stateCivil: string;

  @Column({ name: 'ocupation', nullable: true })
  ocupation: string;

  @Column({ name: 'parent', nullable: true })
  parent: string;

  @Column({ type: 'simple-enum', name: 'state', enum: State })
  state: State;

  @Column({ type: "array", nullable: true })
  enrollments: any;

  @Column()
  typeId: string;

  @Column()
  gender: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  birthplace: string;

  @Column()
  nacionality: string;

  @Column()
  cityExp: string;

  @Column()
  rh: string;

  @Column()
  eps: string;

  @Column()
  relation: string;

  @Column({ type: "array", nullable: true })
  courses: Course[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
