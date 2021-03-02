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
  @Column({ name: 'peace_safe_file', nullable: true })
  peaceSafeFile: string;

  @Column({ name: 'academic_file', nullable: true })
  academicFile: string;

  @Column({ name: 'doc_student_file', nullable: true })
  docStudentFile: string;

  @Column({ name: 'doc_dad_file', nullable: true })
  docDadFile: string;

  @Column({ name: 'doc_mom_file', nullable: true })
  docMomFile: string;

  @Column({ name: 'doc_tutor_file', nullable: true })
  docTutorFile: string;

  @Column({ name: 'academic_period', nullable: true })
  academicPeriod: string;

  @Column({ name: 'year', nullable: true })
  year: string;

  @Column({ name: 'obs', nullable: true })
  obs: string;

  @Column({ name: 'working_day', nullable: true })
  workingDay: string;

  @Column({ name: 'enroll_modality', nullable: true })
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
