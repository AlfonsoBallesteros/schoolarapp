/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Type } from './type.entity';
import { Person } from './person.entity';
import { State } from './enumeration/state';

/**
 * A Enrollment.
 */
@Entity('enrollment')
export class Enrollment extends BaseEntity {
  @Column({ nullable: true })
  peaceSafeFile: string;

  @Column({ nullable: true })
  academicFile: string;

  @Column({ nullable: true })
  docStudentFile: string;

  @Column({ nullable: true })
  docDadFile: string;

  @Column({ nullable: true })
  docMomFile: string;

  @Column({ nullable: true })
  docTutorFile: string;

  @Column({ nullable: true })
  docRegistrationCertificate: string;

  @Column({ nullable: true })
  academicPeriod: string;

  @Column({ name: 'year', nullable: true })
  year: string;

  @Column({ name: 'obs', nullable: true })
  obs: string;

  @Column({ nullable: true })
  workingDay: string;

  @Column({ nullable: true })
  enrollModality: string;

  @Column({ type: 'boolean', name: 'legacy', nullable: true })
  legacy: boolean;

  @Column({ type: 'simple-enum', name: 'state', enum: State })
  state: State;

  @Column()
  workShop: string;

  @Column()
  gradeProx: string;

  @Column()
  student: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
