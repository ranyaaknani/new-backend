import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { InvitationEntity } from './invitation.entity';
import { InvitationsService } from './invitation.service';

@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post('add')
  async create(@Body() createInvitationDto: CreateInvitationDto): Promise<{
    success: boolean;
    message: string;
    data: InvitationEntity;
  }> {
    try {
      const invitation =
        await this.invitationsService.create(createInvitationDto);
      return {
        success: true,
        message: 'Invitation created successfully',
        data: invitation,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to create invitation',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  findAll(): Promise<InvitationEntity[]> {
    return this.invitationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<InvitationEntity> {
    return this.invitationsService.findOne(id);
  }

  //   @Put(':id')
  //   update(
  //     @Param('id') id: string,
  //     @Body() updateInvitationDto: UpdateInvitationDto,
  //   ): Promise<InvitationEntity> {
  //     return this.invitationsService.update(id, updateInvitationDto);
  //   }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.invitationsService.remove(id);
  }
}
