# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from openapi_server.models.gbfs_free_bike_status import GbfsFreeBikeStatus  # noqa: E501
from openapi_server.models.gbfs_station_information import GbfsStationInformation  # noqa: E501
from openapi_server.models.gbfs_station_status import GbfsStationStatus  # noqa: E501
from openapi_server.models.gbfs_system import GbfsSystem  # noqa: E501
from openapi_server.models.gbfs_system_information import GbfsSystemInformation  # noqa: E501
from openapi_server.test import BaseTestCase


class TestRawDataController(BaseTestCase):
    """RawDataController integration test stubs"""

    def test_get_free_bike_status(self):
        """Test case for get_free_bike_status

        Get GBFS Free bike status information
        """
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/api/v1/gbfs/{gbfs_system_id}/free_bike_status'.format(gbfs_system_id='gbfs_system_id_example'),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_gbfs(self):
        """Test case for get_gbfs

        Get GBFS URLs information
        """
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/api/v1/gbfs/{gbfs_system_id}'.format(gbfs_system_id='gbfs_system_id_example'),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_station_information(self):
        """Test case for get_station_information

        Get GBFS Station information
        """
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/api/v1/gbfs/{gbfs_system_id}/station_information'.format(gbfs_system_id='gbfs_system_id_example'),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_station_status(self):
        """Test case for get_station_status

        Get GBFS Station status information
        """
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/api/v1/gbfs/{gbfs_system_id}/station_status'.format(gbfs_system_id='gbfs_system_id_example'),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_system_information(self):
        """Test case for get_system_information

        Get GBFS System information
        """
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/api/v1/gbfs/{gbfs_system_id}/system_information'.format(gbfs_system_id='gbfs_system_id_example'),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_post_gbfs(self):
        """Test case for post_gbfs

        Posts GBFS URLs information
        """
        gbfs_system = openapi_server.GbfsSystem()
        headers = { 
            'Accept': 'text/html',
            'Content-Type': 'application/json',
        }
        response = self.client.open(
            '/api/v1/gbfs/{gbfs_system_id}'.format(gbfs_system_id='gbfs_system_id_example'),
            method='POST',
            headers=headers,
            data=json.dumps(gbfs_system),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_post_station_information(self):
        """Test case for post_station_information

        Posts GBFS Station information
        """
        gbfs_station_information = openapi_server.GbfsStationInformation()
        headers = { 
            'Accept': 'text/html',
            'Content-Type': 'application/json',
        }
        response = self.client.open(
            '/api/v1/gbfs/{gbfs_system_id}/station_information'.format(gbfs_system_id='gbfs_system_id_example'),
            method='POST',
            headers=headers,
            data=json.dumps(gbfs_station_information),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_post_system_information(self):
        """Test case for post_system_information

        Posts GBFS System information
        """
        gbfs_system_information = openapi_server.GbfsSystemInformation()
        headers = { 
            'Accept': 'text/html',
            'Content-Type': 'application/json',
        }
        response = self.client.open(
            '/api/v1/gbfs/{gbfs_system_id}/system_information'.format(gbfs_system_id='gbfs_system_id_example'),
            method='POST',
            headers=headers,
            data=json.dumps(gbfs_system_information),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
