"""empty message

Revision ID: 015e1e49a705
Revises: 
Create Date: 2025-02-21 12:05:29.486586

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '015e1e49a705'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('modele_voiture',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('marque', sa.String(length=50), nullable=False),
    sa.Column('modele', sa.String(length=50), nullable=False),
    sa.Column('annee', sa.Integer(), nullable=False),
    sa.Column('prix_par_jour', sa.Numeric(precision=10, scale=2), nullable=False),
    sa.Column('categorie', sa.String(length=30), nullable=True),
    sa.Column('image_voiture', sa.LargeBinary(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('utilisateur',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nom', sa.String(length=50), nullable=False),
    sa.Column('prenom', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('mot_de_passe_hash', sa.String(length=255), nullable=False),
    sa.Column('role', sa.String(length=20), nullable=True),
    sa.Column('date_creation', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('voiture',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('modele_id', sa.Integer(), nullable=False),
    sa.Column('immatriculation', sa.String(length=20), nullable=False),
    sa.Column('disponible', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['modele_id'], ['modele_voiture.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('immatriculation')
    )
    op.create_table('location',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('utilisateur_id', sa.Integer(), nullable=False),
    sa.Column('voiture_id', sa.Integer(), nullable=False),
    sa.Column('date_debut', sa.Date(), nullable=False),
    sa.Column('date_fin', sa.Date(), nullable=False),
    sa.Column('prix_total', sa.Numeric(precision=10, scale=2), nullable=False),
    sa.ForeignKeyConstraint(['utilisateur_id'], ['utilisateur.id'], ),
    sa.ForeignKeyConstraint(['voiture_id'], ['voiture.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('location')
    op.drop_table('voiture')
    op.drop_table('utilisateur')
    op.drop_table('modele_voiture')
    # ### end Alembic commands ###
